const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Email_accountsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const email_accounts = await db.email_accounts.create(
      {
        id: data.id || undefined,

        email_provider: data.email_provider || null,
        email_address: data.email_address || null,
        password: data.password || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await email_accounts.setUser(data.user || null, {
      transaction,
    });

    return email_accounts;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const email_accountsData = data.map((item, index) => ({
      id: item.id || undefined,

      email_provider: item.email_provider || null,
      email_address: item.email_address || null,
      password: item.password || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const email_accounts = await db.email_accounts.bulkCreate(
      email_accountsData,
      { transaction },
    );

    // For each item created, replace relation files

    return email_accounts;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const email_accounts = await db.email_accounts.findByPk(
      id,
      {},
      { transaction },
    );

    await email_accounts.update(
      {
        email_provider: data.email_provider || null,
        email_address: data.email_address || null,
        password: data.password || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await email_accounts.setUser(data.user || null, {
      transaction,
    });

    return email_accounts;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const email_accounts = await db.email_accounts.findByPk(id, options);

    await email_accounts.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await email_accounts.destroy({
      transaction,
    });

    return email_accounts;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const email_accounts = await db.email_accounts.findOne(
      { where },
      { transaction },
    );

    if (!email_accounts) {
      return email_accounts;
    }

    const output = email_accounts.get({ plain: true });

    output.emails_email_account = await email_accounts.getEmails_email_account({
      transaction,
    });

    output.user = await email_accounts.getUser({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'user',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.email_provider) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'email_accounts',
            'email_provider',
            filter.email_provider,
          ),
        };
      }

      if (filter.email_address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'email_accounts',
            'email_address',
            filter.email_address,
          ),
        };
      }

      if (filter.password) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('email_accounts', 'password', filter.password),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.user) {
        var listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.email_accounts.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.email_accounts.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('email_accounts', 'email_address', query),
        ],
      };
    }

    const records = await db.email_accounts.findAll({
      attributes: ['id', 'email_address'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['email_address', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.email_address,
    }));
  }
};

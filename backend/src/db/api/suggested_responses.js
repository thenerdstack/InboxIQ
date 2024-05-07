const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Suggested_responsesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const suggested_responses = await db.suggested_responses.create(
      {
        id: data.id || undefined,

        response_text: data.response_text || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await suggested_responses.setEmail(data.email || null, {
      transaction,
    });

    return suggested_responses;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const suggested_responsesData = data.map((item, index) => ({
      id: item.id || undefined,

      response_text: item.response_text || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const suggested_responses = await db.suggested_responses.bulkCreate(
      suggested_responsesData,
      { transaction },
    );

    // For each item created, replace relation files

    return suggested_responses;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const suggested_responses = await db.suggested_responses.findByPk(
      id,
      {},
      { transaction },
    );

    await suggested_responses.update(
      {
        response_text: data.response_text || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await suggested_responses.setEmail(data.email || null, {
      transaction,
    });

    return suggested_responses;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const suggested_responses = await db.suggested_responses.findByPk(
      id,
      options,
    );

    await suggested_responses.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await suggested_responses.destroy({
      transaction,
    });

    return suggested_responses;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const suggested_responses = await db.suggested_responses.findOne(
      { where },
      { transaction },
    );

    if (!suggested_responses) {
      return suggested_responses;
    }

    const output = suggested_responses.get({ plain: true });

    output.email = await suggested_responses.getEmail({
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
        model: db.emails,
        as: 'email',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.response_text) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'suggested_responses',
            'response_text',
            filter.response_text,
          ),
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

      if (filter.email) {
        var listItems = filter.email.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          emailId: { [Op.or]: listItems },
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
          count: await db.suggested_responses.count({
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
      : await db.suggested_responses.findAndCountAll({
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
          Utils.ilike('suggested_responses', 'response_text', query),
        ],
      };
    }

    const records = await db.suggested_responses.findAll({
      attributes: ['id', 'response_text'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['response_text', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.response_text,
    }));
  }
};

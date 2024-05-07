const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const email_accounts = sequelize.define(
    'email_accounts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      email_provider: {
        type: DataTypes.TEXT,
      },

      email_address: {
        type: DataTypes.TEXT,
      },

      password: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  email_accounts.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.email_accounts.hasMany(db.emails, {
      as: 'emails_email_account',
      foreignKey: {
        name: 'email_accountId',
      },
      constraints: false,
    });

    //end loop

    db.email_accounts.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.email_accounts.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.email_accounts.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return email_accounts;
};

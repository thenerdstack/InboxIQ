const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const emails = sequelize.define(
    'emails',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      subject: {
        type: DataTypes.TEXT,
      },

      body: {
        type: DataTypes.TEXT,
      },

      received_at: {
        type: DataTypes.DATE,
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

  emails.associate = (db) => {
    db.emails.belongsToMany(db.suggested_responses, {
      as: 'suggested_responses',
      foreignKey: {
        name: 'emails_suggested_responsesId',
      },
      constraints: false,
      through: 'emailsSuggested_responsesSuggested_responses',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.emails.hasMany(db.suggested_responses, {
      as: 'suggested_responses_email',
      foreignKey: {
        name: 'emailId',
      },
      constraints: false,
    });

    //end loop

    db.emails.belongsTo(db.email_accounts, {
      as: 'email_account',
      foreignKey: {
        name: 'email_accountId',
      },
      constraints: false,
    });

    db.emails.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.emails.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return emails;
};

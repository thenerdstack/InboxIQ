const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const suggested_responses = sequelize.define(
    'suggested_responses',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      response_text: {
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

  suggested_responses.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.suggested_responses.belongsTo(db.emails, {
      as: 'email',
      foreignKey: {
        name: 'emailId',
      },
      constraints: false,
    });

    db.suggested_responses.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.suggested_responses.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return suggested_responses;
};

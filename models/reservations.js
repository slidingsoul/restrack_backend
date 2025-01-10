'use strict';

module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    reservation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    table_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tables', 
        key: 'table_id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'user_id',
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'cancelled', 'completed', 'inreview'),
      allowNull: false,
    },
    cancelled_by: {
      type: DataTypes.ENUM('user', 'moderator'),
    },
    deposited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    timestamps: true, 
    tableName: 'Reservations', 
  });

  Reservation.associate = function(models) {
    Reservation.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Reservation.belongsTo(models.Table, {
      foreignKey: 'table_id',
      as: 'table',
    });
  };

  return Reservation;
};

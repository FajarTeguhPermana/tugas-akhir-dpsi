const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const User = require("./user");
const Pelanggan = sequelize.define(
  "Pelanggan",
  {
    PelangganID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID : {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
);

module.exports = Pelanggan;

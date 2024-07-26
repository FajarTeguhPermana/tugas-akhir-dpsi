const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Pelanggan = require("./pelanggan");
const Keranjang = require("./keranjang");
const Pemesanan = sequelize.define("Pemesanan", {
  pemesananID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  totalHarga: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("dipesan", "diproses", "selesai"),
    allowNull: false,
  },
  metodePembayaran: {
    type: DataTypes.ENUM("debit", "kredit", "E-wallet"),
    allowNull: false,
  },
  pelangganID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pelanggan,
      key: "pelangganID",
    },
  },
  keranjangID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Keranjang,
      key: "keranjangID",
    },
  },
});

Pemesanan.belongsTo(Pelanggan, { foreignKey: "pelangganID" });
Pelanggan.hasMany(Pemesanan, { foreignKey: "pelangganID" });

Pemesanan.belongsTo(Keranjang, { foreignKey: "keranjangID" });
Keranjang.hasMany(Pemesanan, { foreignKey: "keranjangID" });
module.exports = Pemesanan;

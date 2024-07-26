const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Pelanggan = require("./pelanggan");
const Produk = require("./produk");
const Keranjang = sequelize.define("Keranjang", {
  keranjangID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  totalHarga: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  jumlah: {
    type: DataTypes.INTEGER,
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
  produkID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Produk,
      key: "produkID",
    }
  }
});

Keranjang.belongsTo(Pelanggan, { foreignKey: "pelangganID" });
Pelanggan.hasOne(Keranjang, { foreignKey: "pelangganID" });

Keranjang.belongsTo(Produk, { foreignKey: "produkID" });
Produk.hasMany(Keranjang, { foreignKey: "produkID" });

module.exports = Keranjang;

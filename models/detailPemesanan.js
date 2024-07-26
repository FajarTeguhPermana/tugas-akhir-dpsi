const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Pemesanan = require("./pemesanan");
const Produk = require("./produk");
const DetailPemesanan = sequelize.define("DetailPemesanan", {
  detailPemesananID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pemesananID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pemesanan,
      key: "pemesananID",
    },
  },
  produkID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Produk,
      key: "produkID",
    },
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

DetailPemesanan.belongsTo(Pemesanan, { foreignKey: "pemesananID" });
Pemesanan.hasMany(DetailPemesanan, { foreignKey: "pemesananID" });

DetailPemesanan.belongsTo(Produk, { foreignKey: "produkID" });
Produk.hasMany(DetailPemesanan, { foreignKey: "produkID" });
module.exports = DetailPemesanan;

const express = require("express");
const router = express.Router();
const Produk = require("../models/produk");
const Item = require("../models/keranjang");
const { authenticate, authorize } = require("../middleware/auth");


// endpoint untuk memambahkan produk ke keranjang
router.post("/", authenticate, async (req, res, next) => {
  try {
    const { jumlah, pelangganID, produkID } = req.body;

    // Ambil data produk berdasarkan produkID dari database
    const produk = await Produk.findByPk(produkID);
    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    const totalHarga = produk.harga * jumlah;

    const newItem = await Item.create({
      totalHarga,
      jumlah,
      pelangganID,
      produkID,
    });
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

// endpoint untuk menampilkan semua isi keranjang
router.get("/", authenticate, async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// endpoint untuk menampilkan berdasarkan ID
router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Produk Tidak Ditemukan" });
    }
  } catch (err) {
    next(err);
  }
});

// Endpont untuk mengubah isi keranjang berdasarkan ID
router.put("/:id", authenticate, async (req, res, next) => {
  try {
    const { jumlah, pelangganID, produkID } = req.body;
    const item = await Item.findByPk(req.params.id);
    if (item) {
      // Ambil data produk berdasarkan produkID baru dari database
      const produk = await Produk.findByPk(produkID);
      if (!produk) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
      }

      // Hitung total harga baru
      const totalHarga = produk.harga * jumlah;

      // Update item dengan data baru
      item.jumlah = jumlah;
      item.pelangganID = pelangganID;
      item.produkID = produkID;
      item.totalHarga = totalHarga;
      await item.save();

      res.json(item);
    } else {
      res.status(404).json({ message: "Produk tidak ditemukan" });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus berdasarkan ID
router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.destroy();
      res.json({ message: "Produk Telah di Hapus" });
    } else {
      res.status(404).json({ message: "Produk Tidak Ditemukan" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Item = require("../models/produk");
const { authenticate, authorize } = require("../middleware/auth");

router.post("/", authenticate, authorize(["admin"]), async (req, res, next) => {
  try {
    const { nama, kategori, harga, stok, deskripsi } = req.body;
    const newItem = await Item.create({
      nama,
      kategori,
      harga,
      stok,
      deskripsi,
    });
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

router.get("/", authenticate, async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

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

router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  async (req, res, next) => {
    try {
      const { nama, kategori, harga, stok, deskripsi } = req.body;
      const item = await Item.findByPk(req.params.id);
      if (item) {
        item.nama = nama;
        item.kategori = kategori;
        item.harga = harga;
        item.stok = stok;
        item.deskripsi = deskripsi;
        await item.save();
        res.json(item);
      } else {
        res.status(404).json({ message: "Produk Tidak Ditemukan" });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  async (req, res, next) => {
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
  }
);

module.exports = router;

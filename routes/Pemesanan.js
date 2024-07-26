const express = require("express");
const router = express.Router();
const Item = require("../models/pemesanan");
const { authenticate, authorize } = require("../middleware/auth");

router.post("/", authenticate(['admin']), async (req, res, next) => {
  try {
    const { totalHarga, alamat, status, metodePembayaran, pelangganID, keranjangID  } = req.body;
    const newItem = await Item.create({
      totalHarga,
      alamat,
      status,
      metodePembayaran,
      pelangganID,
      keranjangID
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
      res.status(404).json({ message: "Pemesanan Tidak Ditemukan" });
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
        const { totalHarga, alamat, status, metodePembayaran, pelangganID, keranjangID } = req.body;
        const item = await Item.findByPk(req.params.id);
        if (item) {
          item.totalHarga = totalHarga;
          item.alamat = alamat;
          item.status = status;
          item.metodePembayaran = metodePembayaran;
          item.pelangganID = pelangganID;
          item.keranjangID = keranjangID;
          await item.save();
          res.json(item);
        } else {
          res.status(404).json({ message: "Pemesanan tidak ditemukan" });
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
        res.json({ message: "Pemesanan Telah di Hapus" });
      } else {
        res.status(404).json({ message: "Pemesanan Tidak Ditemukan" });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

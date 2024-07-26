const express = require("express");
const router = express.Router();
const Item = require("../models/pelanggan");
const { authenticate, authorize } = require("../middleware/auth");

// Endpoint untuk menambahkan akun pelanggan
// user dengan role Customer hanya di beri akses untuk menambahkan akun pelanggan dan hanya satu kali.
router.post(
  "/",
  authenticate,
  authorize(["customer"]),
  async (req, res, next) => {
    try {
      const userID = req.user.id; // Mengambil ID pengguna dari token yang diautentikasi
      console.log(req.user.id);

      // Memeriksa apakah pelanggan sudah ada untuk pengguna ini
      const existingItem = await Item.findOne({ where: { userID } });
      if (existingItem) {
        return res
          .status(400)
          .json({ message: "Anda sudah memiliki akun" });
      }

      // Jika tidak ada pelanggan yang terdaftar, buat akun pelanggan baru
      const { nama, email, alamat } = req.body;
      const newItem = await Item.create({
        nama,
        email,
        alamat,
        userID, 
      });
      res.status(201).json(newItem);
    } catch (err) {
      next(err);
    }
  }
);

// Endpoint untuk menampilkan semua data pelanggan dan hanya dapat diakses oleh user dengan role admin
router.get("/", authenticate, authorize(["admin"]), async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua data pelanggan berdasarkan ID dan hanya dapat diakses oleh user dengan role admin
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  async (req, res, next) => {
    try {
      const item = await Item.findByPk(req.params.id);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: "Akun Tidak Ditemukan" });
      }
    } catch (err) {
      next(err);
    }
  }
);

// Endpoint untuk mengubah data pelanggan berdasarkan ID dan hanya dapat diakses oleh user dengan role admin
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  async (req, res, next) => {
    try {
      const { nama, email, alamat } = req.body;
      const item = await Item.findByPk(req.params.id);
      if (item) {
        item.nama = nama;
        item.email = email;
        item.alamat = alamat;
        await item.save();
        res.json(item);
      } else {
        res.status(404).json({ message: "Akun Tidak Ditemukan" });
      }
    } catch (err) {
      next(err);
    }
  }
);

// Endpoint untuk menghapus data pelanggan berdasarkan ID dan hanya dapat diakses oleh user dengan role admin
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  async (req, res, next) => {
    try {
      const item = await Item.findByPk(req.params.id);
      if (item) {
        await item.destroy();
        res.json({ message: "Akun Telah Dihapus" });
      } else {
        res.status(404).json({ message: "Akun Tidak Ditemukan" });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

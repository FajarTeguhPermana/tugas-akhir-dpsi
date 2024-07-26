const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected successfully to the database");
  conn.release(); // Pastikan koneksi dilepaskan setelah digunakan
});

module.exports = pool.promise();

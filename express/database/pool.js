const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve("env/database.env") });

const config = {
  host: process.env.db_host,
  port: process.env.db_port,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
};

const pool = mysql.createPool(config);

const getConnectionPool = (callback) => {
  pool.getConnection((err, conn) => {
    if (!err) callback(conn);
  });
};

exports.getConnectionPool = getConnectionPool;

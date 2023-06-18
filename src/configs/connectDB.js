import mysql from "mysql2/promise";
require("dotenv").config();

const connectionUri = process.env.DB_CONNECTION_URI;
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });y

const pool = mysql.createPool(connectionUri);

export default pool;

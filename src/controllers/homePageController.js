import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
  const [row, fields] = await pool.execute("SELECT * FROM `traces`");
  return res.render("hse.ejs", { data: row });
};

module.exports = {
  getHomePage,
};

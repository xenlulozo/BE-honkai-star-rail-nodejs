import pool from "../configs/connectDB";

let getData = async (req, res) => {
  // let [data] = await pool.execute("select * from traces");
  // console.log(data);
  // return res.send(JSON.stringify(data));
  return res.render("homepage.ejs");
};
let getAllUser = async (req, res) => {
  // await pool.execute("select * from users");
  let [user] = await pool.execute("select * from users");

  // return res.status(200).json({
  //   message: "ok",
  // });
  return res.send(JSON.stringify(user));
};
let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  console.log(req.body);
  await pool.execute(
    "INSERT INTO users(firstName, lastName, email,address) values(?,?,?,?)",
    [firstName, lastName, email, address]
  );
  return res.status(200).json({
    message: "ok",
  });
};
let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  // console.log(req.body);
  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "null",
    });
  }

  await pool.execute(
    "update users set  firstName  =? , lastName = ?, email=?, address=? where id = ? ",
    [firstName, lastName, email, address, id]
  );
  return res.status(200).json({
    message: "ok",
  });
};
let deleteUser = async (req, res) => {
  let UserId = req.params.id;

  // console.log(req.params.id);

  await pool.execute("delete from users where id = ?", [UserId]);

  return res.status(200).json({
    message: "ok",
  });
};
let character = async (req, res) => {
  let characterId = req.params.id;
  let [user] = await pool.execute("SELECT * FROM `character` where id = ?", [
    characterId,
  ]);
  let [elementSkill] = await pool.execute(
    "SELECT * FROM `element-skill` where id = ?",
    [characterId]
  );
  let [nomalAttack] = await pool.execute(
    "SELECT * FROM `nomal-attack` where id = ?",
    [characterId]
  );
  let [burstSkill] = await pool.execute(
    "SELECT * FROM `burst-skill` where id = ?",
    [characterId]
  );
  user.push(nomalAttack, elementSkill, burstSkill);
  // return res.send(JSON.stringify(user));
  return res.send(user);
};
let nomalAttack = async (req, res) => {
  let characterId = req.params.id;
  let [user] = await pool.execute("SELECT * FROM `nomal-attack` where id = ?", [
    characterId,
  ]);

  // return res.send(JSON.stringify(user));
  return res.send(user);
};
let getUploadFile = async (req, res) => {
  return res.render("keasa");
};

module.exports = {
  getData,
};

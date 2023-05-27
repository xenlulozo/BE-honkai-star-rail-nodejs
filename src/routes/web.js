import express from "express";
import pool from "../configs/connectDB";
// import homePageController from "../../controllers/homePageController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/info/:id", async (req, res) => {
    const { id } = req.params;
    const [row, fields] = await pool.execute(
      `SELECT JSON_OBJECT( 'id', c.id,'name', c.name, 'rarity', c.rarity, 'element', c.element, 'skills', CONCAT('[', GROUP_CONCAT( JSON_OBJECT( 'skillId', s.skillId, 'name', s.name, 'type', s.type, 'desc', s.description, 'tags', s.tags ) SEPARATOR ','), ']' ), 'energyUltimate', c.energyUltimate ) AS json_data FROM \`character\` c JOIN skill s ON c.id = s.characterId WHERE c.id = ${id} GROUP BY c.id;`
    );
    // return res.render("hse.ejs", { data: row });
    return res.send(JSON.stringify(row));
  });
  router.get("/traces/:id", async (req, res) => {
    const { id } = req.params;
    const [row, fields] = await pool.execute(
      `SELECT CONCAT('[', GROUP_CONCAT( JSON_OBJECT( 'req', cts.req, 'desc', cts.description, 'name', cts.name, 'sub_nodes', IFNULL(subnodes_json, '[]') ) SEPARATOR ','), ']') AS traces FROM CharacterTraces cts LEFT JOIN ( SELECT ctsn.traceId, CONCAT('[', GROUP_CONCAT( JSON_OBJECT( 'req', ctsn.req, 'stat', ctsn.stat, 'value', ctsn.value ) SEPARATOR ','), ']') AS subnodes_json FROM CharacterTracesSubNodes ctsn GROUP BY ctsn.traceId ) subnodes ON cts.traceId = subnodes.traceId WHERE cts.characterId = ${id}  GROUP BY cts.traceId;`
    );
    // return res.render("hse.ejs", { data: row });
    return res.send(JSON.stringify(row));
  });
  router.get("/list", async (req, res) => {
    const [row, fields] = await pool.execute(
      "SELECT CONCAT('[', GROUP_CONCAT(json_data SEPARATOR ','), ']') AS json_array FROM ( SELECT JSON_OBJECT( 'id', character.id, 'name', character.name ) AS json_data FROM hsr.character ) AS subquery;"
    );
    // return res.render("hse.ejs", { data: row });
    return res.send(JSON.stringify(row));
    // return res.send(row);
  });
  router.get("/test", async (req, res) => {
    const [row, fields] = await pool.execute(
      "SELECT CONCAT('[', GROUP_CONCAT(json_data SEPARATOR ','), ']') AS json_array FROM ( SELECT JSON_OBJECT( 'id', character.id, 'name', character.name ) AS json_data FROM hsr.character ) AS subquery;"
    );
    return res.json(row);
  });

  return app.use("/", router);
};
module.exports = initWebRoutes;

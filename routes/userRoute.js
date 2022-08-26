var express = require("express");
var router = express.Router();
const pool = require("../database/pool");

router.get("/getUserList", async (req, res, next) => {
  let {
    serviceKey = "00000000", // 서비스 인증키
  } = req.query;

  console.log(serviceKey);

  //http://localhost:3000/user/getUserList?serviceKey=26689323
  try {
    const sql = `SELECT * FROM t_user;`;

    const data = await pool.query(sql);
    const resultList = data[0];

    let jsonResult = {
      resultList,
    };
    return res.json(jsonResult);
  } catch (error) {
    return res.status(500).json(err);
  }
});

router.get("/getUserDetail", async (req, res, next) => {
  let {
    serviceKey = "00000000", // 서비스 인증키
    userID = 0,
  } = req.query;

  console.log(serviceKey, userID);

  //http://localhost:3000/user/getUserDetail?serviceKey=26689323&userID=10
  try {
    const sql = `SELECT * FROM t_user WHERE user_id = ?;`;

    const data = await pool.query(sql, [userID]);
    const resultList = data[0];

    let jsonResult = {
      resultList,
    };
    return res.json(jsonResult);
  } catch (error) {
    return res.status(500).json(err);
  }
});

router.post("/postUser", async (req, res, next) => {
  let {
    userID = 0,
    orgCode = 0,
    userName = "",
    userPass = "",
    telNum = "",
  } = req.body;
  console.log(userID, orgCode, userName, userPass, telNum);

  let resulCode = "00";

  if (userID === "") resulCode = "10";
  if (orgCode === "") resulCode = "10";
  if (userName === "") resulCode = "10";
  if (userPass === "") resulCode = "10";
  if (telNum === "") resulCode = "10";

  if (resulCode !== "00") {
    return res.json({ resultCode: "01", resultMsg: "에러" });
  }

  try {
    let sql =
      "INSERT INTO t_user(user_id, org_code, user_name, user_pass, tel_no) VALUES (?, ?, ?, ?, ?)";
    const data = await pool.query(sql, [
      userID,
      orgCode,
      userName,
      userPass,
      telNum,
    ]);
    console.log(userID, orgCode, userName, userPass, telNum);
    console.log("data[0]=>" + data[0]);
    let resultList = data[0];
    let jsonResult = {
      resultList,
    };

    return res.json(jsonResult);
  } catch (err) {
    console.log("test===============" + err);
    return res.status(500).json(err);
  }
});

router.put("/putUserName", async (req, res, next) => {
  let { userID = 0, userName = "", userPass = "" } = req.body;
  console.log(userName, userPass);

  let resulCode = "00";

  if (userID === "") resulCode = "10";

  if (userName === "") resulCode = "10";

  if (userPass === "") resulCode = "10";

  if (resulCode !== "00") {
    return res.json({ resultCode: "01", resultMsg: "에러" });
  }

  try {
    let sql =
      "UPDATE t_user SET user_name = IF (user_pass = ?, ?, user_name) WHERE user_id = ?;";
    console.log("sql=>" + sql);
    const data = await pool.query(sql, [userPass, userName, userID]);
    console.log("data[0]=>" + data[0]);
    let resultList = data[0];
    let jsonResult = {
      resultList,
    };

    return res.json(jsonResult);
  } catch (err) {
    console.log("ERROR===============" + err);
    return res.status(500).json(err);
  }
});

router.delete("/deleteUser", async (req, res, next) => {
  let { userID = 0, userName = "", userPass = "" } = req.body;
  console.log(userID, userName, userPass);

  let resulCode = "00";

  if (userID === "") resulCode = "10";

  if (userName === "") resulCode = "10";

  if (userPass === "") resulCode = "10";

  if (resulCode !== "00") {
    return res.json({ resultCode: "01", resultMsg: "에러" });
  }

  try {
    let sql = "DELETE FROM t_user WHERE user_id = ?";
    const data = await pool.query(sql, [userID]);
    console.log("data[0]=>" + data[0]);

    let jsonResult = {
      resulCode: resulCode,
    };
    return res.json(jsonResult);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;

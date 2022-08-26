var express = require("express");
var router = express.Router();
const pool = require("../database/pool");

router.get("/getOrgList", async (req, res, next) => {
  let {
    serviceKey = "00000000", // 서비스 인증키
  } = req.query;

  console.log(serviceKey);

  //http://localhost:3000/user/getOrgList?serviceKey=26689323
  try {
    const sql = `SELECT * FROM t_organization_code;`;

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

router.get("/getOrgDetail", async (req, res, next) => {
  let {
    serviceKey = "00000000", // 서비스 인증키
    orgCode = 0,
  } = req.query;

  console.log(serviceKey, orgCode);

  //http://localhost:3000/org/getOrgDetail?serviceKey=26689323&orgCode=1
  try {
    const sql = `SELECT * FROM t_organization_code WHERE org_code = ?;`;

    const data = await pool.query(sql, [orgCode]);
    const resultList = data[0];

    let jsonResult = {
      resultList,
    };
    return res.json(jsonResult);
  } catch (error) {
    return res.status(500).json(err);
  }
});

router.get("/getOrgWorkersList", async (req, res, next) => {
  let {
    serviceKey = "00000000", // 서비스 인증키
  } = req.query;

  console.log(serviceKey);

  //http://localhost:3000/org/getOrgWorkers?serviceKey=26689323
  try {
    const sql = `SELECT * FROM t_user a INNER JOIN t_organization_code b
                 WHERE a.org_code = b.org_code limit 5;`;

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

router.post("/postOrg", async (req, res, next) => {
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

module.exports = router;

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

      const sql = `SELECT * FROM t_organization_code;`;
  
      const data = await pool.query(sql);
      const resultList = data[0];
    
      let jsonResult = {
        resultList
      };
      return res.json(jsonResult);
    } catch (error) {
      return res.status(500).json(err);
    }
  })
  
  module.exports = router;

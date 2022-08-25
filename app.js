const express = require("express");

const userRoute = require("./routes/userRoute");

const app = express();
const port = 3000; // 서버 포트번호

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
//app.use("/org", orgRoute);

app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`);
  });
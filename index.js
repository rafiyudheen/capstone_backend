const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConfig = require("./config/dbConfig");
const apiRouter = require("./routers/apiRouter");

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

dbConfig();

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`app listerning @ ${port}`);
});

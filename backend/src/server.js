const express = require("express");
const cors = require("cors");
const database = require("./config/database");
require('dotenv').config;

const UserApi = require("./api/user");
const UserRouter = require("./routes/user");
const DogRouter = require("./routes/dog");
const authMiddleware = require("./middleware/authMiddleware");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/api/v1/login", UserApi.login);
app.post("/api/v1/user", UserApi.createUser);

app.use("/api/v1/user", authMiddleware(), UserRouter);
app.use("/api/v1/dog", DogRouter);

database.db
  .sync({ force: false })
  .then((_) => {
    if (!process.env.TEST) {
      app.listen(port, (_) => {
        console.log("Server running on port 3000");
      });
    }
  })
  .catch((e) => {
    console.error(`Erro ao inicializar o banco de dados ${e}`);
  });

module.exports = app;

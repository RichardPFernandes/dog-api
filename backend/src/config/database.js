const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.db = new Sequelize({
      database: "dogapi_ejys",
      host: "dpg-cslb86rtq21c73eg5lr0-a",
      username: "dogapi_ejys_user",
      dialect: "mysql",
      password: "PtZvuyG4yG5MpaaPcC3I9vuR6CEG2WU6",
    });
  }
}

module.exports = new Database();

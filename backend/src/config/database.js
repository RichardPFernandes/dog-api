const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.db = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: true,
    });
  }
}

module.exports = new Database();

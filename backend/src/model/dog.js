const database = require("../config/database");

class Dog {
  constructor() {
    this.model = database.db.define("dogs", {
      id: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      raca: {
        type: database.db.Sequelize.STRING,
      },
      expec_vida: {
        type: database.db.Sequelize.STRING,
      },
      url_imagem: {
        type: database.db.Sequelize.STRING,
      }
    });
  }
}

module.exports = new Dog().model;

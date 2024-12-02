const bcrypt = require("bcrypt");
const database = require("../config/database");

class User {
  constructor() {
    this.model = database.db.define("users", {
      id: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: database.db.Sequelize.STRING,
      },
      email: {
        type: database.db.Sequelize.STRING,
        unique: true,
      },
      senha: {
        type: database.db.Sequelize.STRING, 
      },
      role: {
        type: database.db.Sequelize.STRING,
        validate: {
          isIn: [["admin", "viewer"]],
        },
      },
      bloqueado: {
        type: database.db.Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });

    this.addDefaultAdmin();
  }

  async addDefaultAdmin() {
    try {
      await this.model.sync();

      const existingAdmin = await this.model.findOne({
        where: { role: "admin" },
      });

      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash("admin123", 10); 

        await this.model.create({
          nome: "Admin",
          email: "admin@gmail.com",
          senha: hashedPassword, 
          role: "admin",
        });

        console.log("Default admin added successfully.");
      } else {
        console.log("Default admin already exists.");
      }
    } catch (error) {
      console.error("Error adding default admin:", error);
    }
  }
}

module.exports = new User().model;

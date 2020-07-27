const { Sequelize } = require("sequelize");

const db = new Sequelize({
    username: "postgres",
    password: "99198730",
    database: "my_db",
    dialect: "postgres",
    host: "localhost",
    logging: false
});

module.exports = db;
const sequelize = require("./Server")
const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const router = express.Router();

const Users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    mail: DataTypes.STRING(50),
    password: DataTypes.STRING(50),
    fio: DataTypes.STRING(50),
    main_co: DataTypes.STRING(30),
    description: DataTypes.STRING(300),
    count: DataTypes.INTEGER,
    img: DataTypes.STRING(50)
  });
 
router.get("/users_all", async (req, res) => {
    try {
      const users = await Users.findAll();
      res.send(users);
    } catch (err) {
      console.error("Ошибка получения пользователей:", err);
      res.status(500).send("Ошибка сервера");
    }
  });

router.get("/user_login", async (req, res) => {
    const { login, password } = req.body;

    try {
      const user = await Users.findOne({ where: { login, password } });
      res.send(user);
    } catch (err) {
      console.error("Ошибка получения пользователей:", err);
      res.status(500).send("Ошибка сервера");
    }
  });

module.exports = router
const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const express = require('express'); //подключение необходимых библиотек и модулей
const { default: axios } = require('axios');
const  bodyParser = require('body-parser')

const app = express(); //создание приложения
const cors=require("cors")

app.set('port', 2222) //установка порта 2222 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
})); //установка политики CORS
const sequelize = new Sequelize(
    'besties',
    'my_user',
    'root',
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );

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
  },
  {
    tableName: 'users',
    timestamps: false // отключаем автоматические поля createdAt и updatedAt
  });

  const Votes = sequelize.define('votes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    date_from: DataTypes.DATE,
    date_to: DataTypes.DATE
  },
  {
    tableName: 'votes',
    timestamps: false // отключаем автоматические поля createdAt и updatedAt
  });

  const VotesForUser = sequelize.define('votes_for_user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    coin_count: DataTypes.INTEGER,
    description: DataTypes.STRING(300)
  },
  {
    tableName: 'votes_for_user',
    timestamps: false // отключаем автоматические поля createdAt и updatedAt
  });
  
  VotesForUser.belongsTo(Votes);
  VotesForUser.belongsTo(Users);

  app.post("/login", async (req, res) => {
    try {
      console.log(req.body)
      const user = await Users.findOne({where: {
        mail: req.body.mail,
        password: req.body.password
      }});
      if(!user) res.send(undefined)
      else{
        user.password = undefined
        user.fio = user.fio.replace(/[^A-ZА-Я]/g, '')
        res.send(user);
      }
    } catch (err) {
      console.error("Ошибка получения пользователя:", err);
      res.status(500).send("Ошибка сервера");
    }
  });

  app.post("/votes", async (req, res) => {
    try {
      let user = req.body.user;
      let result=await sequelize.query(
        `SELECT 
        v.id,
        EXTRACT(YEAR FROM v.date_to) AS year,
        EXTRACT(MONTH FROM v.date_to) AS month,
        CASE WHEN v.id = 1 THEN (EXTRACT(DAY FROM v.date_to) - EXTRACT(DAY FROM CURRENT_DATE)) ELSE -1 END AS days_diff,
        SUM(COALESCE(vf.coin_count, 0)) AS total_coin_count,
        SUM(CASE WHEN vf.vote_from = :user THEN vf.coin_count ELSE 0 END) AS coin_counts_from_user
    FROM 
        votes v
        LEFT JOIN votes_for_user vf ON v.id = vf.vote_id
    GROUP BY 
        v.id
    ORDER BY
      v.id`, 
        {  replacements: { user }, type: QueryTypes.SELECT })
      if(!result) res.send('Ура!')
      else{
        res.send(result);
      }
    } catch (err) {
      console.error("Ошибка получения голосований:", err);
      res.status(500).send("Ошибка сервера");
    }
  });

  app.post("/users", async (req, res) => {
    try {
      let vote_id = req.body.vote_id;
      let result=await sequelize.query(
        `SELECT u.id, u.mail, u.fio, u.main_co, u.description, u.img, SUM(CASE WHEN v.vote_id = :vote_id THEN v.coin_count ELSE 0 END) as total_coin_count
        FROM users u
        LEFT JOIN votes_for_user v ON u.id = v.user_id
        GROUP BY u.id
        ORDER BY total_coin_count DESC, u.id`, 
        {  replacements: { vote_id }, type: QueryTypes.SELECT })
      if(!result) res.send('111111111111!')
      else{
        res.send(result);
      }
    } catch (err) {
      console.error("Ошибка получения пользователей:", err);
      res.status(500).send("Ошибка сервера");
    }
  });

  app.post("/comments", async (req, res) => {
    try {
      let vote_id = req.body.vote_id;
      let user_id = req.body.user_id;
      let result=await sequelize.query(
        `SELECT *
        FROM votes_for_user
        WHERE vote_id = :vote_id AND user_id = :user_id;`, 
        {  replacements: { vote_id, user_id }, type: QueryTypes.SELECT })
      if(!result) res.send('3333333333333333!')
      else{
        res.send(result);
      }
    } catch (err) {
      console.error("Ошибка получения комментариев:", err);
      res.status(500).send("Ошибка сервера");
    }
  });

  app.post("/add_comment", async (req, res) => {
    try {
      let selectedValue = req.body.selectedValue;
      let comment = req.body.comment;
      let auserId = req.body.auserId;
      let vote_id = req.body.vote_id;
      let user_id = req.body.user_id;
      let result=await sequelize.query(
        `INSERT INTO votes_for_user (coin_count, description, vote_from, vote_id, user_id)
        VALUES (:selectedValue, :comment, :auserId, :vote_id, :user_id);
        UPDATE users SET count = count - :selectedValue WHERE id = :auserId;`, 
        {  replacements: { selectedValue, comment, auserId, vote_id, user_id}, type: QueryTypes.SELECT })
      if(!result) res.send('999999999999999999!')
      else{
        res.send(result);
      }
    } catch (err) {
      console.error("Ошибка добавления комментария:", err);
      res.status(500).send("Ошибка сервера");
    }
  });

sequelize.sync().then(() => {
    console.log("Синхронизация модели прошла успешно.");
  }).catch((err) => {
    console.error("Ошибка синхронизации модели:", err);
  });

 app.listen(2222, () => {
    console.log('Server listening on port 2222...');
  });
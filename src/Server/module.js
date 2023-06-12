const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  'besties',
  'my_user',
  'root',
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

const Votes = sequelize.define('votes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  date_from: DataTypes.DATE,
  date_to: DataTypes.DATE
});

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

const VotesForUser = sequelize.define('votes_for_user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  coin_count: DataTypes.INTEGER,
  description: DataTypes.STRING(300)
});

VotesForUser.belongsTo(Votes);
VotesForUser.belongsTo(Users);

module.exports = { Votes, Users, VotesForUser };
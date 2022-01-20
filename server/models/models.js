 const sequelize = require('../db')
 const {DataTypes} = require('sequelize')

 const User = sequelize.define( 'user', {
     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
     email: {type: DataTypes.STRING, unique: true, allowNull: false},
     password: {type: DataTypes.STRING, allowNull: false},
     role: {type: DataTypes.STRING, defaultValue: "User"},
     name: {type: DataTypes.STRING, defaultValue: ""},
     sex: {type: DataTypes.STRING, defaultValue: "М"},
     age: {type: DataTypes.INTEGER, defaultValue: 0},
     post_adr: {type: DataTypes.STRING, defaultValue: ""},
     img: {type: DataTypes.STRING, defaultValue: ""},
 })

 const Hobby = sequelize.define( 'hobby', {
     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
     name: {type: DataTypes.STRING, unique: true, allowNull: false},
 })

 const UsrHobby = sequelize.define( 'usr_hobby', {
     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
     userId: {
         type: DataTypes.INTEGER,
         unique: true,
         allowNull: false,
         references: {
             model: User,
             key: 'id'
         }
     },
     hobbyId: {
         type: DataTypes.INTEGER,
         unique: true,
         allowNull: false,
         references: {
             model: Hobby,
             key: 'id'
         }
     }
 })

 const UsrPair = sequelize.define( 'usr_pair', {
     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
     santa_id: {
         type: DataTypes.INTEGER,
         unique: true,
         allowNull: false,
         references: {
             model: User,
             key: 'id'
         }
     },
     rec_id: {
         type: DataTypes.INTEGER,
         unique: true,
         allowNull: false,
         references: {
             model: User,
             key: 'id'
         }
     }
 })

 User.hasOne(UsrPair, {
     as: 'santaPair',
     foreignKey: 'santa_id',
 })

 User.hasOne(UsrPair, {
     as: 'receiverPair',
     foreignKey: 'rec_id',
 })

 UsrPair.belongsTo(User, {
     as: 'santaUser',
     foreignKey: 'santa_id',
 })

 UsrPair.belongsTo(User, {
     as: 'receiverUser',
     foreignKey: 'rec_id',
 })

 User.hasMany(UsrHobby, {
     as: 'userHobby',
     foreignKey: 'userId',
 })

 UsrHobby.belongsTo(User, {
     as: 'user',
     foreignKey: 'userId',
 })

 Hobby.hasMany(UsrHobby, {
     as: 'hobbyUser',
     foreignKey: 'hobbyId',
 })

 UsrHobby.belongsTo(Hobby, {
     as: 'hobby',
     foreignKey: 'hobbyId',
 })

 module.exports = {
     User,
     Hobby,
     UsrPair,
     UsrHobby
 }
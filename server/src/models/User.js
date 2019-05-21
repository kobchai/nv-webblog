module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    status: DataTypes.STRING,
    type: DataTypes.STRING
  })

  User.prototype.comparePassword = function (password) {
    if (password == this.password) {
      return true
    }
  }

  User.associate = function (models) {}
  
  return User
}
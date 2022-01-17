function(sequelize, DataTypes) {
          self.sequelize = sequelize
          self.User      = sequelize.define('User', {
            username: DataTypes.STRING,
            secretValue: DataTypes.STRING,
            data: DataTypes.STRING
          })
        }
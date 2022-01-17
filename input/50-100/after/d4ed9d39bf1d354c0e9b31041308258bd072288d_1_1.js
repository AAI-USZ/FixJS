function(sequelize, DataTypes) {
          self.sequelize = sequelize
          self.User      = sequelize.define('User', {
            username:  { type: DataTypes.STRING },
            touchedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            aNumber:   { type: DataTypes.INTEGER }
          })
        }
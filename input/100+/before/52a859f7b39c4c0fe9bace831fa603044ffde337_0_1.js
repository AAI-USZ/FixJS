function(done) {
        this.User = this.sequelize.define('User', {
          username: Sequelize.STRING,
          secretValue: Sequelize.STRING,
          data: Sequelize.STRING
        })

        this.User
          .sync({ force: true })
          .success(done)
          .error(function(err) { console.log(err) })
      }
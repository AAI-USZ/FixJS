function() {
    it('clears the association if null is passed', function(done) {
      var User = sequelize.define('User', { username: Sequelize.STRING })
        , Task = sequelize.define('Task', { title: Sequelize.STRING })

      Task.belongsTo(User)

      sequelize.sync({ force: true }).success(function() {
        User.create({ username: 'foo' }).success(function(user) {
          Task.create({ title: 'task' }).success(function(task) {
            task.setUser(user).success(function() {
              task.getUser().success(function(user) {
                expect(user).not.toEqual(null)

                task.setUser(null).success(function() {
                  task.getUser().success(function(user) {
                    expect(user).toEqual(null)
                    done()
                  })
                })

              })
            })
          })
        })
      })
    })
  }
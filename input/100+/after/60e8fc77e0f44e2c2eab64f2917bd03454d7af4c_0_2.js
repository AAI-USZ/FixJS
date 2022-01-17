function(done) {
      var User = sequelize.define('User', { username: Sequelize.STRING })
        , Task = sequelize.define('Task', { title: Sequelize.STRING })

      User.hasMany(Task)
      Task.hasMany(User)

      console.log(sequelize.daoFactoryManager.daos.length)

      sequelize.sync({ force: true }).success(function() {
        console.log('sync ok')
        User.create({ username: 'foo' }).success(function(user) {
          console.log('user was created')
          Task.create({ title: 'task' }).success(function(task) {
            console.log('task was created')
            task.setUsers([ user ]).success(function() {
                console.log('set users done')

                task.getUsers().success(function(_users) {
                  console.log(_users.length)
                  expect(_users.length).toEqual(1)

                  task.setUsers(null).success(function() {

                    task.getUsers().success(function(_users) {
                      expect(_users.length).toEqual(0)
                      done()
                    })
                  }).error(function(err) {
                    console.log(err)
                  })
                }).error(function(err) {
                  console.log(err)
                })
              })
              .error(function(err) {
                console.log(err)
              })
          })
        })
      })
    }
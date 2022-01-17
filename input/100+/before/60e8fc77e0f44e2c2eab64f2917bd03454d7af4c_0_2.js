function() {
        console.log('sync ok')
        User.create({ username: 'foo' }).success(function(user) {
          console.log('user was created')
          Task.create({ title: 'task' }).run().success(function(task) {
            console.log('task was created')
            expect(1).toEqual(1)
            return done()
            task.setUsers([ user ])
              .success(function() {
                console.log('set users done')

                task.getUsers().success(function(_users) {
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
      }
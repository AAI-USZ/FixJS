function(_users) {
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
                }
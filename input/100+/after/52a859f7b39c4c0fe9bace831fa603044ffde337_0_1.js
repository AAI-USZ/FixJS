function(done) {
        var self = this
          , data = { username: 'Peter', secretValue: '42' }

        this.User.create(data, ['username']).success(function(user) {
          self.User.find(user.id).success(function(_user) {
            expect(_user.username).toEqual(data.username)
            expect(_user.secretValue).not.toEqual(data.secretValue)
            expect(_user.secretValue).toEqual(null)
            done()
          })
        })
      }
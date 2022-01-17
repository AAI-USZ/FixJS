function () {
          self.emit('reconnecting')
          self.connect.apply(self, _args)
        }
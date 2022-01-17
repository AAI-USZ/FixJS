function () {
          self.emit('reconnecting')
          self.connect.apply(self, args)
        }
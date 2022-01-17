function () {
        debug('reconnecting')
        self.emit('reconnecting')
        socketvat.prototype.connect.apply(self, _args)
      }
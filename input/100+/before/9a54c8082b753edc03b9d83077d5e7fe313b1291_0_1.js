function () {
            // if the close appeared because of intentional abortion or a reconnect is already scheduled, just return
            if (!(self.abortedBy === undefined || self.abortedBy === 'no')) return
            // remember we got disconnected by Twitter and the reconnect is about to get scheduled
            self.abortedBy = 'twitter'
            
            if (self.connectInterval === undefined) {
              self.request = keepAlive()
              self.connectInterval = 0
              return
            }
            //rate limited - back off for a minute (danger of getting blocked by twitter)
            if (_res !== undefined && _res.statusCode === 420) self.connectInterval = 60000
            //double til 320s
            else if (self.connectInterval >= 16000 && self.connectInterval <= 320000) self.connectInterval = 2*self.connectInterval
            else if (self.connectInterval <= 320000) self.connectInterval += 250
            
            self.emit('reconnect', self.request, self.connectInterval)
            
            setTimeout(function () {
              self.request = keepAlive()
            }, self.connectInterval)
          }
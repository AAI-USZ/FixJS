function() {
      self.abortedBy = 'no';
    
      var request = self.makeRequest(null);
      var _res;

      request
          .on('response', function (res) {
            _res = res;
            res.setEncoding('utf8');
            res.on('data', function (chunk) { 
              parser.parse(chunk) 
            })
          })
          //tcp errors:
          //250ms , increment linearly til 16s
          //http errors:
          //5s, double til 320s
          //
          //back off linearly @ 250ms til 16s, then double til 320s
          .on('close', function () {
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
            if (_res !== undefined && _res.statusCode === 420) self.connectInterval = 60000;
            //double til 320s
            else if (self.connectInterval >= 16000 && self.connectInterval <= 320000) self.connectInterval *= 2;
            else if (self.connectInterval <= 320000) self.connectInterval += 250;
            
            self.emit('reconnect', self.request, self.connectInterval);
            
            setTimeout(function () {
              self.request = keepAlive();
            }, self.connectInterval)
          })
          .on('error', function (err) {
            self.emit('error', err);
            //don't need to do anything here; this gets called when the request is abort()'ed' 
          })
          .end();
          
      self.emit('connect', request);
      
      return request;
    }
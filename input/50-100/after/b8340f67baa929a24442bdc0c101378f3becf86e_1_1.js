function() {
      intervalId = setInterval(function() {
        crypto.randomBytes(16, function(ex,buf) {
          var message = 'Message from space: ' + buf;
          ss.publish.all('ss-example', message);
        });
      }, 3000);
      console.log("Interval Id: %s", intervalId);
      res("Receiving SpaceMail"); 
    }
function(ex,buf) {
          var message = 'Message from space: ' + buf;
          ss.publish.all('ss-example', message);
        }
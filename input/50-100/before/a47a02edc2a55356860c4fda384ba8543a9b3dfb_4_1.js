function (e) {
      if (e.code == 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(function () {
          listener.close();
          listener.listen(request.params.portNum, function() { //'listening' listener
            console.log('server re-bound to '+ request.params.portNum);
            success.listening = true;
            response.json(success);
            response.end();
          });
        }, 1000);
      }
      else console.log('other error ',e);
    }
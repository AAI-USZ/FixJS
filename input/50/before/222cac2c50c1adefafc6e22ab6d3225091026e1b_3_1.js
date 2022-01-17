function () {
      
         // this kind of emit will send to all! :D
         io.sockets.emit('chat', {
            msg : "user " + name + ' conected!', 
            msgr : "[Server]"
         });
      }
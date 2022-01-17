function( err, success ) {
        if (err) {
          console.log( err );
        }
        sent++;
        socket.emit("send", Math.round(sent * 100 / pending)+"%");
        if(pending === sent) {
          socket.emit("done");
          delete sockets[hash];
        }
      }
function() {
        console.log("sync : ");
        socket.emit('redmineExtract::sync', function (data) {
          console.log(data);
        });
    }
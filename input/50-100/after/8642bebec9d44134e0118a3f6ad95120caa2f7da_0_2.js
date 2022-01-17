function (data) {
    console.log('There are now', sockets.length);
    sockets.forEach(function (s) {
      if (socket !== socket) {
        s.send('broadcasting', data);
      }
    });
   console.dir(data);
 }
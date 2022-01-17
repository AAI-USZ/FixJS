function (data){
    console.log("Current users: "+JSON.stringify(users));

    var i = 0;
    var heatFlag = false;

    var photos = [];

    for(var j in users) {
      i++;
      photos.push(users[j].photo);
    }

    socket.broadcast.to(data.channelName).emit("playerCount", {
      "number": i,
      "photos": photos
    });
  }
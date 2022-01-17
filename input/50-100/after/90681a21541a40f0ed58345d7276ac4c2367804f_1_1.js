function (data){
    console.log("Current users: "+JSON.stringify(users));

    var i = 0;
    var heatFlag = false;

    var photos = [];

    for(var j in users) {
      i++;
    }

    socket.broadcast.to(data.channelName).emit("playerCount", JSON.stringify({
      "number": i,
      "users": users
    }));
  }
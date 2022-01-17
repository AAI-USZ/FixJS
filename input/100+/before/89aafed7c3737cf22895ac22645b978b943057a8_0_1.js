function(room, user,handler,callback) {
    if (userToRoom[user] && userToRoom[user] != room) {
      rooms[userToRoom[user]].getUserToService()[user].leave();
    }
    userToRoom[user] = room;
    var gh = null;
    console.log(gmToRh);
    if (gmToRh[user]) {
      gh = gmToRh[user];
    }
    rooms[room].join(user, handler, function(h, partial) {
      callback(h, partial, gh);
    });
  }
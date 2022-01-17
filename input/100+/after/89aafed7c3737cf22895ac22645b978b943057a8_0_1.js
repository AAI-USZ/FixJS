function(room, user,handler,callback) {
    if (userToRoom[user] && userToRoom[user] != room) {
      rooms[userToRoom[user]].getUserToService()[user].leave();
    }
    userToRoom[user] = room;
    var gh = null;
    if (roomToGm[room] == user) {
      gh = rooms[room];
    }
    rooms[room].join(user, handler, function(h, partial) {
      callback(h, partial, gh);
    });
  }
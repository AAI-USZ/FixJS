function(user, callback) {
    var Room = app.model.Multiplayer.Room;
    var room = new Room("main",user, {}, function(room) {
      rooms["main"] = room;
      callback(room);
    });
  }
function(user,properties, callback) {
    var Room = app.model.Multiplayer.Room;
    var room = new Room("main", user, properties, function(room) {
      rooms["main"] = room;
      callback(room);
    });
  }
function(name) {
  for (var i in userToRoom) {
    if (userToRoom[i].name == name) {
      userToRoom[i] = null;
    }
  }
  r = rooms[name];
  app.events.trigger(new app.model.Events.Event(app.Constants.Events.Type.ROOM_DELETED, app.Constants.Events.Level.IMPORTANT, app.util.room.convertRoom(r)));
  delete rooms[name];
}
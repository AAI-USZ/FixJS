function(room) {
          rooms[properties.name] = r;
          app.events.trigger(new app.model.Events.Event(app.Constants.Events.Type.ROOM_CREATED, app.Constants.Events.Level.IMPORTANT, app.util.room.convertRoom(r)));
          roomToGm[properties.name] = user.id;
          callback(r);
        }
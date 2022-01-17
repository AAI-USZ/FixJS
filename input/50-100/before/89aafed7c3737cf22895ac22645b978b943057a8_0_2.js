function(room) {
          rooms[properties.name] = r;
          app.events.trigger(new app.model.Events.Event(app.Constants.Events.Type.ROOM_CREATED, app.Constants.Events.Level.IMPORTANT, app.util.room.convertRoom(r)));
          gmToRh[user.id] = r;
          callback(r);
        }
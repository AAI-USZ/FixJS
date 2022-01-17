function(res,query, callback) {
          var r = app.getRooms();
          var rooms = [];
          for (var i in r) {
            var room = util.convertRoom(r[i]);
            rooms.push(room);
          }
          callback(rooms);
        }
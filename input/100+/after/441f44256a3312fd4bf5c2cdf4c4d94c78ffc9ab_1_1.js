function(res, query, callback) {
          var r = app.getRooms();
          for (var i in r) {
            if (query.room == r[i].name) {
              var room = util.convertRoom(r[i]);
              callback(room);
            }
          }
        }
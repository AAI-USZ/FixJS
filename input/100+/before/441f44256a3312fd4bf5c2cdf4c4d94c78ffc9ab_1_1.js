function(res, query, callback) {
          var r = app.getRooms();
          for (var i in r) {
            if (query.room == r[i].name) {
              var room = {};
              room.name = r[i].name;
              room.host = app.getUsers()[r[i].host];
              room.game = r[i].game;
              room.properties = r[i].properties;
              room.teams = r[i].teams;
              room.users = r[i].users;
              callback(room);
            }
          }
        }
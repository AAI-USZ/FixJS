function(u, callback) {
        app.log(app.Constants.Tag.DAO, ["user.save", u.fbId]);
        app.dao.user.get(u.id, function(user){
          if (user != null){
            client.query(""+"UPDATE "+Constants.Table.USER+" SET username=?, fb_id=?, email=? WHERE id=?", [user.name,user.fbId, user.email, user.id], function(err, rows, fields) {
              if (err) throw err;
              if (rows.length == 0) {
                callback(null);
                return;
              }
              var result = rows[0];
              if (callback) {
                callback(user);
              }
            });
          } else {
            client.query(""+"INSERT INTO "+Constants.Table.USER+"(username, fb_id, email) values(?,?,?)",[u.name, u.fbId, u.email], function(err, rows, fields) {
              if (err) throw err;
              callback(u);
            });
          }
        });
      }
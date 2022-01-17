function(err, rows, fields) {
              if (err) throw err;
              if (rows.length == 0) {
                callback(null);
                return;
              }
              var result = rows[0];
              var user = new Model.User(result.id, result.username, result.fb_id, result.email, result.timestamp);
              callback(user);
            }
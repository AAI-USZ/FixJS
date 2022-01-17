function(user) {
              if (user == null) {
                user = new app.model.Dao.User(null, fbObject.name, fbObject.id, fbObject.email, null);
              }
              app.dao.user.save(user);
              app.getUsers()[user.id]=user;
              callback(user);
            }
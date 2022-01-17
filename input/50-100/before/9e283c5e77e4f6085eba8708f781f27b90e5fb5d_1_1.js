function(err, hash) {
          // Store hash in your password DB.
          var user = new User();
          user.username = data.username;
          user.password = hash;
          user.save();
          console.log(user);
          socket.emit('register_success', {username: user.username});
          current_user = user;
      }
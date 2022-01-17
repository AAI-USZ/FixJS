function(left) {
              if (left) {
                for (var i in users) {
                  if (users[i] == user) {
                    users.splice(i,1);
                  }
                }
                console.log(channelName, userToHandler[user]);
                if (callback) {
                  callback(true);
                }
              } else {
                if (callback) {
                  callback(false);
                }
              }
            }
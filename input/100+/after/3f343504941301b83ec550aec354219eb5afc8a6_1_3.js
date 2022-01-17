function(err, meetup){
              console.log("got meetup")
              if (err){
                console.log("bad meetup id");
                return;
              }

              var message = "Hey " + d.member.member_name + ". We're ordring food for " + meetup.name + 
                            " through Chow Down. If you want to place an order go to " 
                            + config.get("server_host") + "/order/" + meetup.meetup_id + "?name=" 
                            + encodeURIComponent(d.member.member_name);
                             
              
              if (new Date().getTime() > meetup.host_oauth_expire){
                console.log("refreshing token");
                // token expired
                oauth.refreshToken(meetup.host_oauth_refresh, function(err, data){
                  if (err){
                    return console.log("error refreshing token", err);
                  }

                  meetup.host_oauth_token = data.access_token;
                  meetup.host_refresh_token = data.refresh_token;
                  meetup.host_oauth_expires = new Date().getTime() + (Number(data.expires) * 1000);
                  sendMessage(message, data.access_token, memberId);
                });
              } else {
                sendMessage(message, meetup.host_oauth_token, memberId);
              }
            }
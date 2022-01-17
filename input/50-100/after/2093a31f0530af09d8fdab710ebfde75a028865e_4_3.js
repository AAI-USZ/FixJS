function(handler, partial) {
              window.room = room;
              loadRoom(room);
              window.handler = handler;
              var but = $("<button>Start</button>");
              but.click(function(){
                window.gm.start(user.id, function(started) {
                  if (started) {
                    loadRoom(room);
                  }
                });
              });
              $("#start").html(but);
            }
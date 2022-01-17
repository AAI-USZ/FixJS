function(handler) {
              window.room = room;
              loadRoom(room);
              window.handler = handler;
              var but = $("<button>Start</button>");
              but.click(function(){
                window.gm.start();
                loadRoom(room);
              });
              $("#create").append(but);
            }
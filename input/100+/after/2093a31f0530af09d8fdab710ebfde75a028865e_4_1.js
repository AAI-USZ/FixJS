function() {
      var room = $("#name").val().trim();
      if (room!= "") {
        window.multiService.createRoom(user.id,{type:"ffa",maxOccupancy:10,name:$("#name").val(),numQuestions:20},function(o) {
          if (o) {
            window.gm = o;
            window.multiService.joinRoom(room, user.id, mHandler, function(handler, partial) {
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
            });
          }
        });
      }
    }
function() {
    var create = function() {
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
    var send = function() {
      window.handler.chat($("#message").val().trim());
      $("#message").val("");
    }
    var buzz = function() {
      window.handler.buzz(function(buzzed) {
        if (buzzed) {
          $("#answer").focus();
        }
      });
    }
    var answer = function() {
      window.handler.answer($("#answer").val().trim(), function(right) {
        $("#answer").val("");
        $("#response").html(right+"");
      });
    }
    var join = function() {
      var roomname = $("#roomlist").val();
      if (roomname) {
        window.multiService.joinRoom(roomname, user.id, mHandler, function(handler) {
          window.handler = handler;
          window.room = roomname;
          loadRoom(roomname);
        });
      }
    }
    $("#createbutton").click(create);
    $("#name").keypress(function(event) {
      if ( event.which == 13 ) {
        create();
      }
    });
    $("#send").click(send);
    $("#message").focus(function() {
    });
    $("#message").keypress(function(event) {
      if ( event.which == 13 ) {
        send();
      }
    });
    $("#buzz").click(buzz);
    $("body").keypress(function(event) {
      console.log(unfocused());
      if ( event.which == 32  && unfocused()) {
        buzz(); 
      }
    });
    $("#join").click(join);
    $("#answer").keypress(function(event) {
      if ( event.which == 13 ) {
        answer();
      }
    });
  }
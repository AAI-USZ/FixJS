function() {
      var roomname = $("#roomlist").val();
      if (roomname) {
        window.multiService.joinRoom(roomname, user.id, mHandler, function(handler) {
          window.handler = handler;
          window.room = roomname;
          loadRoom(roomname);
        });
      }
    }
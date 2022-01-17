function() {
      var roomname = $("#roomlist").val();
      if (roomname && roomname != window.room) {
        window.multiService.joinRoom(roomname, user.id, mHandler, function(handler) {
          window.handler = handler;
          window.room = roomname;
          loadRoom(roomname);
        });
      }
    }
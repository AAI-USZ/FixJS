function(user, team) {
      $("#box").append($("<div><i>"+user.name+" sat on Team "+team+"</i></div>"));
      loadRoom(window.room);
    }
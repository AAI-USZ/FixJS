function(user, team) {
      $("#box").append($("<div><i>"+user.name+" sat on Team "+team+"</i></div>"));
      $("#box").animate({scrollTop:$("#box")[0].scrollHeight},"0ms");
      loadRoom(window.room);
    }
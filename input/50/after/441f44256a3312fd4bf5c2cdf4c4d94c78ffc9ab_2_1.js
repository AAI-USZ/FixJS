function(user) {
      $("#box").append($("<div><i>"+user.name+" timed out</i><div>"));
      $("#box").animate({scrollTop:$("#box")[0].scrollHeight},"0ms");
    }
function(user){
      $("#box").append($("<div><i>"+user.name+" buzzed in</i></div>"));
      $("#box").animate({scrollTop:$("#box")[0].scrollHeight},"0ms");
    }
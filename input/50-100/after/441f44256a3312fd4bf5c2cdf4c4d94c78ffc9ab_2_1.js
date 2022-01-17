function(user, message) {
      $("#box").append($("<div><b>"+user.name+"</b>: "+message+"</div>"));
      $("#box").animate({scrollTop:$("#box")[0].scrollHeight},"0ms");
    }
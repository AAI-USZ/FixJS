function(user, message) {
      $("#box").append($("<div><b>"+user.name+"</b>: "+message+"</div>"));
    }
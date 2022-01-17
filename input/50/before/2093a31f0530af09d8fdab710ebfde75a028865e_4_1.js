function(user, message) {
      console.log(user);
      $("#box").append($("<div><b>"+user.name+"</b>: "+message+"</div>"));
    }
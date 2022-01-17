function(data){
          alert("I couldn't log you into your corpus.");
          Utils.debug(data);
          window.app.get("authentication").set("staleAuthentication", true);
        }
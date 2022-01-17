function(data){
          alert("I couldn't log you into your corpus.");
          window.app.get("authentication").set("staleAuthentication", true);
        }
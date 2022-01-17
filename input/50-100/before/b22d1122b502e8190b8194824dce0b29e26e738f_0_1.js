function(arg){
        alert("Saved "+ arg+ " to pouch.");
        window.app.savedcount++;
        if( window.app.savedcount.length == 3){
          localStorage.setItem("userid", window.app.get("authentication").get("userPrivate").get("id"));//the user private should get their id from mongodb
          //save ids to the user also so that the app can bring them back to where they were
          if(typeof thiscallback == "function"){
            thiscallback();
          }
          window.hub.unsubscribe("savedToPouch", null, window.app);
        }
      }
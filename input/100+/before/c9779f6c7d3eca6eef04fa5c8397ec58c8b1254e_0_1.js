function(arg){
        alert("Saved "+ arg+ " to pouch.");
        window.app.savedcount++;
        if( window.app.savedcount == 3){
          localStorage.setItem("userid", window.app.get("authentication").get("userPrivate").get("id"));//the user private should get their id from mongodb
//          window.app.get("authentication").staleAuthentication = true;//TODO turn this on when the pouch stops making duplicates for all the corpus session datalists that we call save on, this will also trigger a sync of the user details to the server, and ask them to use their password to confim that they want to replcate to their corpus.
          //save ids to the user also so that the app can bring them back to where they were
          if(typeof thiscallback == "function"){
            thiscallback();
          }
          window.hub.unsubscribe("savedToPouch", null, window.app);
        }
      }
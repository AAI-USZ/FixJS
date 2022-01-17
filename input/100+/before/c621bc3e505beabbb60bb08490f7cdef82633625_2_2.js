function() {
        console.log("hiding user welcome, syncing users data");
        var u = new User({username:$("#welcomeusername").val(), password: $("#welcomepassword").val() });
        a = new App();
        var auth = a.get("authentication");
        auth.authenticate(u, function(success, errors){
          if(success == null){
            $(".alert-error").html(
                errors.join("<br/>") + " " + Utils.contactUs);
//            alert("Something went wrong, we were unable to contact the server, or something is wrong with your login info.");
            $(".alert-error").show();
            $('#user-welcome-modal').modal("show");
          }else{
            a.createAppBackboneObjects(auth.get("userPrivate").get("corpuses")[0].corpusname, function(){
              $('#user-welcome-modal').modal("hide");
              window.startApp(a, function(){
                var couchConnection = auth.get("userPrivate").get("corpuses")[0]; //TODO make this be the last corpus they edited so that we re-load their dashboard, or let them chooe which corpus they want.
                window.app.get("corpus").logUserIntoTheirCorpusServer(couchConnection, $("#welcomeusername").val(), $("#welcomepassword").val(), function(){
                  //Replicate user's corpus down to pouch
                  window.app.get("corpus").replicateCorpus(couchConnection, function(){
                    if(auth.get("userPrivate").get("mostRecentIds") == undefined){
                      //do nothing because they have no recent ids
                      Utils.debug("User does not have most recent ids, doing nothing.");
                    }else{
                      /*
                       *  Load their last corpus, session, datalist etc
                       */
                      var appids = auth.get("userPrivate").get("mostRecentIds");
                      window.app.loadBackboneObjectsById(couchConnection, appids);
                    }                    
                  });
                });
              });
            });
            
          }
        });
      }
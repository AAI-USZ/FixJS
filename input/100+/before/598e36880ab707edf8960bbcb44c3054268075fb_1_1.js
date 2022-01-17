function(data) {
            if (data.errors != null) {
              $(".alert-error").html(data.errors.join("<br/>")+" "+Utils.contactUs );
              $(".alert-error").show();
            } else if (data.user) {
              $(".alert-error").html("Preparing your first corpus/database for you." );
              $(".alert-error").addClass("alert-success");
              $(".alert-error").removeClass("alert-error");
              $(".alert-error").show();

              /*
               * Create a new user, and put them into the authView, create a corpus, session and datalist for them then
               * dismiss modal
               */ 
              
//                a.createAppBackboneObjects(data.user.couchConnection.corpusname, function(){
                // Faking a login behavior, copy pasted from authentication auth function
                var auth  = a.get("authentication");
                auth.saveServerResponseToUser(data, function(){
                  //this code is now all in one place, in saveServerResponseToUser DO NOT DELETE YET
//                    auth.set("state", "loggedIn");
//                    auth.staleAuthentication = false;
//                    
//                    var u = auth.get("userPrivate");
//                    u.id = data.user._id; //set the backbone id to be the same as the mongodb id
//                    u.set(u.parse(data.user)); //might take internal elements that are supposed to be a backbone model, and override them
//                    
//                    // Over write the public copy with any (new) username/gravatar info set the backbone id of the userPublic to be the same as the mongodb id of the userPrivate
//                    auth.get("userPublic").id = auth.get("userPrivate").id;
//                    if (data.user.publicSelf == null) {
//                      // If the user hasnt already specified their public auth, then put in a username and gravatar,however they can add more details like their affiliation, name, research interests etc.
//                      data.user.publicSelf = {};
//                      data.user.publicSelf.username = auth.get("userPrivate").get("username");
//                      data.user.publicSelf.gravatar = auth.get("userPrivate").get("gravatar");
//                    }
//                    auth.get("userPublic").set(data.user.publicSelf);
//                    auth.get("userPublic").changeCorpus(data.user.corpuses[0].corpusname);
////                  auth.get("userPublic").save();
                  
                  var c = a.get("corpus");
                  c.set({
                    "title" : data.user.username + "'s Corpus",
                    "titleAsUrl" : data.user.username + "Corpus",
                    "description" : "This is an untitled corpus, created by default.",
                    "dataLists" : new DataLists(),
                    "sessions" : new Sessions(),
                    "couchConnection" : data.user.corpuses[0],
                    "corpusname" : data.user.corpuses[0].corpusname
                  });
                  
                  var s = a.get("currentSession");
                  s.get("sessionFields").where({label: "user"})[0].set("value", auth.get("userPrivate").get("username") );
                  s.get("sessionFields").where({label: "consultants"})[0].set("value", "AA");
                  s.get("sessionFields").where({label: "goal"})[0].set("value", "To explore the app and try entering/importing data");
                  s.get("sessionFields").where({label: "dateSEntered"})[0].set("value", new Date());
                  s.get("sessionFields").where({label: "dateElicited"})[0].set("value", "A few months ago, probably on a Monday night.");
                  s.set("corpusname", data.user.corpuses[0].corpusname);
                  s.changeCorpus(data.user.corpuses[0].corpusname);
                  
                  c.get("sessions").add(s);
                  
                  var dl = a.get("currentDataList");
                  dl.set({
                    "title" : "Default Data List",
                    "dateCreated" : (new Date()).toDateString(),
                    "description" : "This is the default data list for this corpus. " +
                      "Any new datum you create is added here. " +
                      "Data lists can be used to create handouts, prepare for sessions with consultants, " +
                      "export to LaTeX, or share with collaborators.",
                    "corpusname" : data.user.corpuses[0].corpusname
                  });
                  dl.changeCorpus(data.user.corpuses[0].corpusname);
                  c.get("dataLists").add(dl);
                  
                  c.changeCorpus(data.user.corpuses[0]);
                  // c.save(); //this is saving to add the corpus to the user's array of corpuses later on
                  window.startApp(a, function(){
//                     auth.get("userPrivate").addCurrentCorpusToUser();
                    window.setTimeout(function(){
                      /*
                       * Use the corpus just created to log the user into that corpus's couch server
                       */
                      var couchConnection = data.user.corpuses[0];
                      c.logUserIntoTheirCorpusServer(couchConnection, dataToPost.username, dataToPost.password, function() {
                        Utils.debug("Successfully authenticated user with their corpus server.");
                        //Bring down the views so the user can search locally without pushing to a server.
                        c.replicateCorpus(couchConnection);
                        
                        //save the users' first dashboard so at least they will have it if they close the app.
                        window.setTimeout(function(){
                          window.app.storeCurrentDashboardIdsToLocalStorage();
                          $('#user-welcome-modal').modal("hide");
                        },10000);
                        
                      });
                    }, 30000);//ask couch after 30 seconds (give it time to make the new user's design docs)
                    console.log("Loadded app for a new user.");
                  });
                });
//                });
            }
          }
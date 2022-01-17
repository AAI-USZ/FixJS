function() {
                        Utils.debug("Successfully authenticated user with their corpus server.");
                        //Bring down the views so the user can search locally without pushing to a server.
                        c.replicateCorpus(couchConnection);
                        
                        //save the users' first dashboard so at least they will have it if they close the app.
                        window.setTimeout(function(){
                          window.app.storeCurrentDashboardIdsToLocalStorage();
                        },10000);
                        
                      }
function(){
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
                }
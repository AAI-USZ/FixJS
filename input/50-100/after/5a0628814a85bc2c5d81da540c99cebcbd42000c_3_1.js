function(err, resp) {
            Utils.debug("Replicate from " + couchurl);
            Utils.debug(resp);
            Utils.debug(err);
            if(err == null || err == undefined){
              //This was a valid connection, lets save it into localstorage.
              localStorage.setItem("mostRecentCouchConnection",JSON.stringify(couchConnection));
              
              // Display the most recent datum in this corpus
              appView.datumsView.updateDatums();
            }
            if(typeof fromcallback == "function"){
              fromcallback();
            }
            window.appView.allSyncedDoc();
          }
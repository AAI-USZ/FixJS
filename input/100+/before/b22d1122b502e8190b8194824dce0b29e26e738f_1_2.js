function(){
        if(couchConnection == null || couchConnection == undefined){
          couchConnection = self.get("couchConnection");
        }
        self.pouch(function(err, db) {
          var couchurl = couchConnection.protocol+couchConnection.domain;
          if(couchConnection.port != null){
            couchurl = couchurl+":"+couchConnection.port;
          }
          couchurl = couchurl +"/"+ couchConnection.corpusname;
          
          db.replicate.to(couchurl, { continuous: false }, function(err, resp) {
            Utils.debug("Replicate to " + couchurl);
            Utils.debug(resp);
            Utils.debug(err);
            if(typeof tocallback == "function"){
              tocallback();
            }
          });
          //We can leave the to and from replication async, and make two callbacks. 
          db.replicate.from(couchurl, { continuous: false }, function(err, resp) {
            Utils.debug("Replicate from " + couchurl);
            Utils.debug(resp);
            Utils.debug(err);
            if(err == null || err == undefined){
              //This was a valid connection, lets save it into localstorage.
              localStorage.setItem("mostRecentCouchConnection",JSON.stringify(couchConnection));
            }
            if(typeof fromcallback == "function"){
              fromcallback();
            }
          });
        });
      }
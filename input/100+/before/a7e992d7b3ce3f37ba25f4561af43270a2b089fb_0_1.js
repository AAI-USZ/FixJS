function(couchConnection, appids, callback) {
      if(couchConnection == null || couchConnection == undefined){
        couchConnection = this.get("corpus").get("couchConnection");
      }
      var self = this;
      var c = this.get("corpus");
      c.set({
        "id" : appids.corpusid,
        "corpusname" : couchConnection.corpusname,
        couchConnection : couchConnection
      });
      c.id = appids.corpusid; //tried setting both ids to match, and it worked!!
      
      c.changeCorpus(function(){
        //fetch only after having setting the right pouch which is what changeCorpus does.
        c.fetch({
          success : function(e) {
            Utils.debug("Corpus fetched successfully" + e);
          },
          error : function(e) {
            Utils.debug("There was an error fetching corpus. Loading defaults..."+e);
          }
        });
      });
      
      var s = this.get("currentSession");
      s.set({"id": appids.sessionid,
        "corpusname" : couchConnection.corpusname});
      s.id = appids.sessionid; //tried setting both ids to match, and it worked!!

      s.changeCorpus(couchConnection.corpusname, function(){
        //fetch only after having setting the right pouch which is what changeCorpus does.
        s.fetch({
          success : function(e) {
            Utils.debug("Session fetched successfully" +e);
          },
          error : function(e) {
            Utils.debug("There was an error fetching the session. Loading defaults..."+e);
            s.set(
                "sessionFields", self.get("corpus").get("sessionFields").clone()
            );
          }
        });
      });
      var dl = this.get("currentDataList");
      dl.set({
        "id" : appids.datalistid, 
        "corpusname" : couchConnection.corpusname});
      dl.id = appids.datalistid; //tried setting both ids to match, and it worked!!

      dl.changeCorpus(couchConnection.corpusname, function(){
        //fetch only after having setting the right pouch which is what changeCorpus does.
        dl.fetch({
          success : function(e) {
            Utils.debug("Data list fetched successfully" +e);
          },
          error : function(e) {
            Utils.debug("There was an error fetching the data list. Loading defaults..."+e);
          }
        });
      });
      
      //TODO move this callback after the fetch succeeds?
      if (typeof callback == "function") {
        callback();
      }
      
    }
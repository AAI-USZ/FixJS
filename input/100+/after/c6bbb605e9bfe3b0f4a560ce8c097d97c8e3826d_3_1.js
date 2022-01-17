function(sessionId, corpusName) {
      Utils.debug("In showFullscreenSession"  + corpusName + " *** "
          + sessionId);
      
      if(sessionId){
        if(!corpusName){
          corpusName = window.app.get("corpus").get("corpusname");
        }
        var cs = window.app.get("currentSession");
        cs.set({
          "corpusname" : corpusName});
        cs.id = sessionId;

        //this could move the corpus to the wrong couch if someones tries to see a datalist that is not in the current corpus, the current corpus might try to move to another pouch.
        if(window.app.get("corpus").get("corpusname") != corpusName ){
          alert("You are opening a session which is not in this corpus. Do you want to switch to the other corpus?");//TODO need nodejs to find out where that data list is from, in general we cant do this, nor should we.  we should jsut tell them data list not found in their database. since the only way to get to a data list now is through a corpus details page, this situation should not arrise.
        }
        
        cs.changeCorpus(corpusName, function(){
          //fetch only after having setting the right pouch which is what changeCorpus does.
          cs.fetch({
            success : function(e) {
              Utils.debug("Session fetched successfully" +e);
              //show pretty views after loading everything.
              window.appView.renderSessionReadonlyViews();
            },
            error : function(e) {
              alert("There was an error fetching the sessions. Loading defaults..."+e);
            }
          });
        });      
      }
       
      this.hideEverything();
      $("#session-fullscreen").show();
    }
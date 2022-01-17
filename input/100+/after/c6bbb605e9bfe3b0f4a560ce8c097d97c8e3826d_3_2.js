function(dataListId, corpusName) {
      Utils.debug("In showFullscreenDataList: " + corpusName + " *** "
          + dataListId);

      if(dataListId){
        if(!corpusName){
          corpusName = window.app.get("corpus").get("corpusname");
        }
        var dl = window.app.get("currentDataList");
        dl.set({
          "corpusname" : corpusName});
        dl.id = dataListId;

        //this could move the corpus to the wrong couch if someones tries to see a datalist that is not in the current corpus, the current corpus might try to move to another pouch.
        if(window.app.get("corpus").get("corpusname") != corpusName ){
          alert("You are opening a data list which is not in this corpus. Do you want to switch to the other corpus?");//TODO need nodejs to find out where that data list is from, in general we cant do this, nor should we.  we should jsut tell them data list not found in their database. since the only way to get to a data list now is through a corpus details page, this situation should not arrise.
        }
        
        dl.changeCorpus(corpusName, function(){
          //fetch only after having setting the right pouch which is what changeCorpus does.
          dl.fetch({
            success : function(e) {
              Utils.debug(" fetched successfully" +e);
              //show pretty views after loading everything.
              window.appView.renderReadonlyDataListViews();
            },
            error : function(e) {
              alert("There was an error fetching the data list. Loading defaults..."+e);
            }
          });
        });
        
      }
      app.router.hideEverything();
      $("#data-list-fullscreen").show();      
    }
function(e){
      localStorage.setItem("saveStatus", "Saving in unload...");
      
      //TODO, this doesn't work.
      //this.storeCurrentDashboardIdsToLocalStorage();
      var returntext = "";
      if(window.appView.totalUnsaved.length >1){
        returntext = "You have unsaved changes, click cancel to save them. \n\n";
      }
      if(window.appView.totalUnsaved.length >1){
        returntext = returntext+"You have unsynced changes, click cancel and then click the sycn button to sync them, this is only important if you want to back up your data or if you are sharing your data with a team. \n\n";
      }
      return returntext;
    }
function(e){
      localStorage.setItem("saveStatus", "Saving in unload...");
      
      //TODO, this doesn't work.
      //this.storeCurrentDashboardIdsToLocalStorage();
      
      return "You have unsaved changes, click cancel to save them. \n\n"
      +"You have unbacked up data. \n\nIf you want backup/share your data with your collaborators click Cancel, then click the Sync button.\n\n"
      +"Your data currently saved on your local tablet/laptop only.";
    }
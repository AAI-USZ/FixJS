function(numberOfUnsyncedItems){
      if(!numberOfUnsyncedItems){
        numberOfUnsyncedItems = 1;
      }
      this.totalUnsynced += numberOfUnsyncedItems;
      $(".unsynced-changes").val(this.totalUnsynced);
    }
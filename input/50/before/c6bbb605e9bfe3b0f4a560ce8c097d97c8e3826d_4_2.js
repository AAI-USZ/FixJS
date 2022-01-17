function(numberOfTotalDocs){
      if(!numberOfTotalDocs){
        //TODO ask pouch how many docs there are?
      }
      this.totalPouchDocs = numberOfTotalDocs;
      $(".unsynced-changes").attr("max", this.totalPouchDocs);
    }
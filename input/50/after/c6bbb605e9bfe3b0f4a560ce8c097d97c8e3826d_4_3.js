function(numberOfTotalDocs){
      if(!numberOfTotalDocs){
        //TODO ask backbone how many docs there are?
        numberOfTotalDocs = 100;
      }
      this.totalBackboneDocs = numberOfTotalDocs;
      $(".unsaved-changes").attr("max", this.totalBackboneDocs);
    }
function(numberOfTotalDocs){
      if(!numberOfTotalDocs){
        //TODO ask backbone how many docs there are?
      }
      this.totalBackboneDocs = numberOfTotalDocs;
      $(".unsaved-changes").attr("max", this.totalBackboneDocs);
    }
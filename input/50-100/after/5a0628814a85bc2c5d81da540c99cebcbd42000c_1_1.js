function(id){
      if(this.totalUnsaved.indexOf(id) == -1){
        this.totalUnsaved.push(id);
      }
      $(".unsaved-changes").val(this.totalUnsaved.length);
      this.addUnsyncedDoc(id);
      this.addBackboneDoc(id);
    }
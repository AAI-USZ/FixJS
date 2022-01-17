function(id){
      var pos = this.totalUnsaved.indexOf(id);
      if(pos > -1){
        this.totalUnsaved.splice(pos, 1);
      }
      $(".unsaved-changes").val(this.totalUnsaved.length);
      this.addUnsyncedDoc(id);
      this.addBackboneDoc(id);
    }
function(numberOfUnsavedItems){
      if(!numberOfUnsavedItems){
        numberOfUnsavedItems = 1;
      }
      this.totalUnsaved += numberOfUnsavedItems;
      $(".unsaved-changes").val(this.totalUnsaved);
    }
function(){
      this.model.set("description",this.$el.find(".data-list-description").val());
      window.appView.addUnsavedDoc(this.model.id);
    }
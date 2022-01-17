function(){
      this.model.set("title",this.$el.find(".data-list-title").val());
      window.appView.addUnsavedDoc(this.model.id);
    }
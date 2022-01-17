function(){
      this.model.set("description",this.$el.find(".corpus-description-input").val());
      window.appView.addUnsavedDoc(this.model.id);

    }
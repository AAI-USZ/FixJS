function(){
      this.model.set("title",this.$el.find(".corpus-title-input").val());
      window.appView.addUnsavedDoc(this.model.id);

    }
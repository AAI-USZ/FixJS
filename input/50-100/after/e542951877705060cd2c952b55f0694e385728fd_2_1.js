function(){
        //console.log('measureView.init');	
        this.measureEditView = new measureEdit({model: this.model, collection: this.collection, collections: this.options.collections});
        this.measureShowView = new measureShow({model: this.model, collection: this.collection, collections: this.options.collections});
        
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.deleteElement, this);
      }
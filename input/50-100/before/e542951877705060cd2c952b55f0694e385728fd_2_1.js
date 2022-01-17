function(){
        //console.log('measureView.init');	
        MeasureNewView = new measureNew({model: this.model, collection: this.collection, collections: this.options.collections});
        MeasureShowView = new measureShow({model: this.model, collection: this.collection, collections: this.options.collections});
      }
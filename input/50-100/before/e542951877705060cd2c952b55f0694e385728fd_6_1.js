function(){
        //console.log('measuresView.init');	

        this.setCollections();

        MeasuresEditView = new measuresEdit({collections: this.options.collections});
        MeasuresListView = new measuresList({collections: this.options.collections});

        window.MeasuresEditView = MeasuresEditView;
        window.MeasuresListView = MeasuresListView;
      }
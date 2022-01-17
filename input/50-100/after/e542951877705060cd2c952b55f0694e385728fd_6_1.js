function(){
        //console.log('measuresView.init');	

        this.setCollections();

        this.measuresCreateView = new measuresCreate({collections: this.options.collections});
        this.measuresListView = new measuresList({collections: this.options.collections});

        this.options.collections.measures.on('add', this.displayList, this);
      }
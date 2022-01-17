function(attributes) {
        this.library = new attributes.collectionType;
        
        this.table = this.$('tbody');
        
        this.library.on('add', this.addOne, this);
        this.library.on('reset', this.addAll, this);
        this.library.on('all', this.render, this);
        // this.list.on('select:some', this.selectedSome, this);
        // this.list.on('select:all', this.selectedAll, this);
        // this.list.on('select:none', this.deselected, this);

        this.library.fetch();
      }
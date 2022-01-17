function(attributes) {
        
        this.list = new attributes.listType;

        this.table = this.$('tbody');

        this.newItemView = new Lists.NewItemView({
          model: new attributes.modelType,
          list: this.list,
        });

        // bind model events
        this.list.on('add', this.addOne, this);
        this.list.on('reset', this.addAll, this);
        this.list.on('all', this.render, this);
        this.list.on('select:some', this.selectedSome, this);
        this.list.on('select:all', this.selectedAll, this);
        this.list.on('select:none', this.deselected, this);

        this.list.fetch();
      }
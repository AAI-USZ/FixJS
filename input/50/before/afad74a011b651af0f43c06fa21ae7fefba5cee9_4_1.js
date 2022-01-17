function() {
      this.collection.bind('add',   this.addOne, this);
      this.collection.bind('reset', this.addAll, this);
      //this.options.collection.bind('all',   this.render, this);

    }
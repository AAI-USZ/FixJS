function() {

      this.options.collection.bind('reset', this.addAll, this);

      this.options.collection.fetch();
    }
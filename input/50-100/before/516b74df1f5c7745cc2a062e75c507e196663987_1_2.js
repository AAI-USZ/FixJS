function() {
      this.model.bind('reset', this.addAll, this);
      this.model.bind('add', this.addTable, this);
    }
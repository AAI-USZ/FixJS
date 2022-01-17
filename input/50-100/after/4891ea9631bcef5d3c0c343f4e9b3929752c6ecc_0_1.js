function() {
      // console.log('streamerview intialize');
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
      this.model.bind('change:online', this.unrender, this);
      this.toggle_unrender = false || this.options.toggle_unrender;
    }
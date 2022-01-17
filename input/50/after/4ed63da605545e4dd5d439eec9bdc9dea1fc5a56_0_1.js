function() {
    // Set options
    _.defaults(this.options, this.default_options);

    // Input element
    this.$input = this.$el.find('input');

    // Render
    this.render();
    
    // Check
    setTimeout(this._check,500);
  }
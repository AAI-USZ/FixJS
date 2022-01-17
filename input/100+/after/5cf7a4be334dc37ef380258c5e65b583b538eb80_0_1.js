function(options){
    _.bindAll(this, 'stopMoving', 'drag');

    this.editor = options.editor;
    this.model.on('change', this.dataChanged, this);
    this.model.on('change:pos', this.updatePosition, this);
    this.model.on('change:zoom', this.updateZoom, this);
    this.model.on('destroy', this.modelDestroyed, this);

    //this.contextmenu = new ContextMenuView(parent_el: this.$el);
    this.contextmenu = new ContextMenuView({model: this.model, parent_el: this.$el});
  }
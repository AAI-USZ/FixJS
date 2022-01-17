function ToolbarSelect(name, options, clicked, isAvailable){
    ToolbarButton.apply(this, [name, clicked, isAvailable]);
    this.options = options || [];
  }
function ToolbarSelect(name, options, clicked){
    ToolbarButton.apply(this, [name, clicked]);
    this.options = options || [];
  }
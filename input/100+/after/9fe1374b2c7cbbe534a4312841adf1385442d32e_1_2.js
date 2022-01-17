function(name){
    var
      area = this.selection.getArea();
    name = name || 'select';
    area.selection = this.selection.selection;
    E.fire(this.el, 'flotr:'+name, [area, this]);
  }
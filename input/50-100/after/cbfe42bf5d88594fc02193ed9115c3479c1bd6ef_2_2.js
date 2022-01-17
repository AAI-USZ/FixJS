function(){
    var i,
        selected = [];

    for (i in this.markers) {
      if (this.markers[i].element.isSelected) {
        selected.push(i);
      }
    }
    return selected;
  }
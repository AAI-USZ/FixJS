function(){
    var i,
        selected = [];

    for (i = 0; i < this.markers.length; i++) {
      if (this.markers[i].element.isSelected) {
        selected.push(i);
      }
    }
    return selected;
  }
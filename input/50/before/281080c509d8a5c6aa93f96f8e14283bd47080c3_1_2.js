function(array, item) {
    var index = this.indexOf(array, item);
    if (index !== -1) { array.splice(index, 1); }
  }
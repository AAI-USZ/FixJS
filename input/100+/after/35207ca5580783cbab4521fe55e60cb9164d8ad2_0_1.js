function(item, array){
    if (!array) return;
    if (!Array.prototype.indexOf) {
        var i = this.arrayIndexOf(array, item);
    } else {
        var i = array.indexOf(item);
    }

    if (i != -1) {
      return array.splice(i, 1)
    };
  }
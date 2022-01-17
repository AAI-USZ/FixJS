function(val, img){
    var labels = this.labels;
    var box = val.box;
    if (box.hasWidth){
      labels.close.push(img);
    } else {
      labels.line.push(img);
    }
  }
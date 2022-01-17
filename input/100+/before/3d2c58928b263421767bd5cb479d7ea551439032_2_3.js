function(val, img){
    var labels = this.labels;
    var def = this.spriteDef[img];
    var box = def.box;
    var params = box.background.params;
    if ('base' in params){
      labels.fix.push(img);
    } else if (this.layout === 'auto' && box.hasWidth){
      labels.close.push(img);
    } else {
      labels.line.push(img);
    }
  }
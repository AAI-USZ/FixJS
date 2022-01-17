function(val, img){
    var labels = this.labels;
    var def = this.spriteDef[img];
    var box = def.box;
    var params = box.background.params;
    if ('base' in params){
      labels.fix.push(img);
    } else if ('end' in params) {
      labels.end.push(img);
    } else if (this.layout === 'auto' && box.hasWidth && 
      box.width < (def.width + def.spritepos_left)* 3){//盒子宽度小于图片的3倍
      labels.close.push(img);
    } else {

      if (this.layout == 'close' && !def['align'] && 
        def['repeat'] == 'no-repeat' && 
        box.width < (def.width + def.spritepos_left)* 3){

        labels.close.push(img);
      } else {
        labels.line.push(img);
      }
    }
  }
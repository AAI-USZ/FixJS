function(img){
    var spriteDef = this.spriteDef;
    var def = spriteDef[img];
    var box = def.box;
    var blocks = this.blocks;
    var params = box.background.params;
    //设置默认右边距
    var width = def.width + def['spritepos_left'];
    width += params.right ? params.right : 10;

    var height = def.height + def['spritepos_top'];
    height += params.bottom ? params.bottom : 10;

    width = box.width > width ? box.width : width;
    height = box.height > height ? box.height : height;

    blocks.push({w: width, h: height});
  }
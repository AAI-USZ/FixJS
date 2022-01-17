function(img){
    var spriteDef = this.spriteDef;
    var def = spriteDef[img];
    var box = def.box;
    var blocks = this.blocks;
    blocks.push({w: box.width, h: def.height});
  }
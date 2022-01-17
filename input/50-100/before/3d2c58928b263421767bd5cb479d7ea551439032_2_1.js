function Vertical(images, spriteDef, layout){
  this.images = images;
  this.spriteDef = spriteDef;
  this.layout = layout;
  this.width = 0;
  this.height = 0;
  this.labels = {
    //固定定位
    fix: [],
    //占独立一行
    line: [],
    //紧凑拼图
    close: []
  };
  this.blocks = [];
  this.init();
}
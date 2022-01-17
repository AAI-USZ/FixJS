function(){
    var spriteDef = this.spriteDef;
    var labels = this.labels;

    forEach(this.images, this.setLables, this);

    this.sortImgs(labels.line);
    this.sortImgs(labels.close);

    forEach(labels.close, this.setBlocks, this);

    //大于3个时候才使用紧凑拼图
    if (this.blocks.length > 2){
      var packer = new GrowingPacker();
      packer.fit(this.blocks);
      this.width = packer.root.w;
      this.height = packer.root.h;
    } else {
      labels.line = labels.close.concat(labels.line);
      labels.close = [];
      this.sortImgs(labels.line);
    }

    forEach(labels.fix, this.siteImg, this);
    forEach(labels.close, this.closeSiteImg, this);
    forEach(labels.line, this.siteImg, this);
  }
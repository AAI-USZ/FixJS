function(){
    var spriteDef = this.spriteDef;
    var labels = this.labels;

    forEach(spriteDef, this.setLables, this);

    this.sortImgs(labels.line);
    this.sortImgs(labels.close);

    forEach(labels.close, this.setBlocks, this);

    var packer = new GrowingPacker();
    packer.fit(this.blocks);
    debugger;
    this.width = packer.root.w;
    this.height = packer.root.h;
    forEach(labels.close, this.closeSiteImg, this);
    forEach(labels.line, this.siteImg, this);
  }
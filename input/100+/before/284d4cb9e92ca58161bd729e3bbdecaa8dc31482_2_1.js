function(err, data){
    if (err) throw new Error(err);

    data = JSON.parse(data);
    console.log(data.info.join(''));

    var file = this.get('file');
    var spriteFile = file.replace('.css', '.sprite.css');
    var cssReader = this.cssReader;
    var len = cssReader.getLen();
    var indexs = Object.keys(this.images);
    var index = indexs.shift();
    var rule, img;
    var multSelector = {};

    for (var i = 0; i < len; i++) {
      rule = cssReader.getRule(i);
      if (index != i){
        this.writeRule(rule);
      } else {
        img = this.images[index];

        //合并selector，处理一个图片有多个selector的情况
        multSelector[img] = multSelector[img] || [];
        multSelector[img] = multSelector[img].concat(rule.selector);
        this.writeSpriteRule(rule, this.imagesDef[img]);
        index = indexs.shift();
      }
    }

    var _this = this;
    forEach(this.sprites, function(sprites, spriteId){
      var selectors = [];
      forEach(sprites.images, function(def, img){
        selectors = selectors.concat(multSelector[img]);
      });

      _this.writeRule({
        'selector': selectors,
        'property': ['background-image', 'background-repeat'],
        'value': ['url(' + sprites['filename'] + ')', 'no-repeat']
      }, true);
    });

    fs.writeFile(spriteFile, this.cssResult, function(err, data){
      if (!err) console.log('success');
    });
  }
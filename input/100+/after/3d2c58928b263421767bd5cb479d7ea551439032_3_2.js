function(){
    var sprites = mixin(this.sprites, {});

    forEach(sprites, function(sprite, name){
      if (!sprite.force8bit){
        var file = name + '-ie6';
        var spriteForIe = mixin(sprite, {});
        spriteForIe = mixin({
          force8bit: true,
          filename: sprite.filename.replace(name, file)
        }, spriteForIe);
        sprites[name + '-ie6'] = spriteForIe;
      }
    });

    var cfg = JSON.stringify(sprites);
    //拼图
    Api.mergeImages([this.get('file'), cfg], this.writeCssBack, this);
  }
f    var imageInfo = this.spriteDef[img];
    var width = this.width;
    var height = this.height;
    var box = imageInfo.box;
    var params = box.background.params;

    var imageWidth = imageInfo.width + imageInfo['spritepos_left'];
    if (imageWidth> width) width = imageWidth;

    //设置固定的坐标
    var coods = imageInfo.coods || params.coods || '';

    if (!coods) {
      //position计算
      left = imageInfo['align'] || '0';
      top = height;
      //if (top && imageInfo.height < height){
      if (top){
        top = '-' + top + 'px';
      } else {
        top = 0;
      }

      //repeat时候必须是整数倍宽度
      if (imageInfo['repeat'] == 'repeat-x'){
        var ceil = Math.ceil(width / imageInfo.width);
        if (ceil < 2) ceil = 2;
        width = imageInfo['width'] * ceil;
      }

      var bottom = box.height - imageInfo['spritepos_top'] - imageInfo['height'];
      height += imageInfo['spritepos_top'];
      imageInfo['spritepos_top'] = height;

      height += parseInt(imageInfo.height, 10);
      //bottom padding
      if (params.bottom){
        height += parseInt(params.bottom, 10);
      } else if (box.hasHeight) {
        height += bottom > 0 ? bottom : 0;
      } else {
        //默认10像素间距
        height += 10;
      }
    } else {
      coods = coods instanceof Array ? coods : JSON.parse(coods);

      top = Math.abs(coods[1]);
      imageInfo['spritepos_top'] =  top + imageInfo['spritepos_top'];
      top = top ? '-' + top + 'px' : top;

      left = Math.abs(coods[0]);
      imageInfo['spritepos_left'] = left + imageInfo['spritepos_left'];
      left = left ? '-' + left + 'px': left;
    }

    this.images[img]['spritepos_top'] = imageInfo['spritepos_top'];
    this.images[img]['spritepos_left'] = imageInfo['spritepos_left'];
    imageInfo.position = left + ' ' + top;
    this.width = width;
    this.height = height;
  },

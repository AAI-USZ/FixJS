function(box, imageInfo){
    var ret = {
      "repeat"         : 'no-repeat',
      "align"          : '',
      "spritepos_left" : 0,
      "spritepos_top"  : 0
    };
    var background = box.background;
    var repeat = background.repeat;
    var position = background.position;

    ret.repeat = repeat;
    if (position){
      //处理center
      if (position.x === 'center'){
        if (box.width){
          position.x = Math.floor((box.width - imageInfo.width) / 2);
        } else {
          console.log('[Error info @' + box.selector.join(', ') + 
            ']use 50% for background-position but not set ');
        }
      }

      if (position.y === 'center'){
        if (box.width){
          position.y = Math.floor((box.height - imageInfo.height) / 2);
        } else {
          console.log('[Error info @]' + box.selector.join(', ') + 
            ']use 50% for background-position-y but not set height');
        }
      }


      if (position.x == 'right') ret['align'] = 'right';

      //is number
      if (+position.x) ret['spritepos_left'] = parseInt(position.x, 10);
      if (+position.y) ret['spritepos_top'] = parseInt(position.y, 10);


    }

    return ret;
  }
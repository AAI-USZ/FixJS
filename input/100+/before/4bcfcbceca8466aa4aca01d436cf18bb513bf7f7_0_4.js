function disassembleSetTile(cmd0,cmd1) {
    var format   = (cmd0>>>21)&0x7;
    var size     = (cmd0>>>19)&0x3;
    //var pad0   = (cmd0>>>18)&0x1;
    var line     = (cmd0>>> 9)&0x1ff;
    var tmem     = (cmd0>>> 0)&0x1ff;

    //var pad1   = (cmd1>>>27)&0x1f;
    var tile_idx = (cmd1>>>24)&0x7;
    var palette  = (cmd1>>>20)&0xf;

    var cm_t     = (cmd1>>>18)&0x3;
    var mask_t   = (cmd1>>>14)&0xf;
    var shift_t  = (cmd1>>>10)&0xf;

    var cm_s     = (cmd1>>> 8)&0x3;
    var mask_s   = (cmd1>>> 4)&0xf;
    var shift_s  = (cmd1>>> 0)&0xf;

    var cm_s_text = getClampMirrorWrapText(cm_s);
    var cm_t_text = getClampMirrorWrapText(cm_t);

    var tile_text = tile_idx;
    if (tile_idx === G_TX_LOADTILE)   tile_text = 'G_TX_LOADTILE';
    if (tile_idx === G_TX_RENDERTILE) tile_text = 'G_TX_RENDERTILE';

    return 'gsDPSetTile(' + getDefine(imageFormatTypes, format) + ', ' + getDefine(imageSizeTypes, size) + ', ' +
     line + ', ' + tmem + ', ' + tile_text + ', ' + palette + ', ' +
     cm_t_text + ', ' + mask_t + ', ' + shift_t + ', ' +
     cm_s_text + ', ' + mask_s + ', ' + shift_s + ');';
  }
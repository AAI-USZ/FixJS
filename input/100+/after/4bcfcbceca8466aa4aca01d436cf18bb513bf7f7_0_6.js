function disassembleLoadTile(cmd0,cmd1) {
    var uls      = (cmd0>>>12)&0xfff;
    var ult      = (cmd0>>> 0)&0xfff;
    var tile_idx = (cmd1>>>24)&0x7;
    var lrs      = (cmd1>>>12)&0xfff;
    var lrt      = (cmd1>>> 0)&0xfff;

    uls /= 4.0;
    ult /= 4.0;
    lrs /= 4.0;
    lrt /= 4.0;

  return 'gsDPLoadTile(' + getTileText(tile_idx) + ', ' + uls + ', ' + ult + ', ' + lrs + ', ' + lrt + '); // (' + (uls/4) + ',' + (ult/4) + '), (' + ((lrs/4)+1) + ',' + ((lrt/4)+1) + ')';
  }
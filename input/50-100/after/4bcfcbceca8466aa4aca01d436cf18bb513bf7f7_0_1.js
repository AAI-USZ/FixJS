function disassembleLoadBlock(cmd0,cmd1) {
    var uls      = (cmd0>>>12)&0xfff;
    var ult      = (cmd0>>> 0)&0xfff;
    var tile_idx = (cmd1>>>24)&0x7;
    var lrs      = (cmd1>>>12)&0xfff;
    var dxt      = (cmd1>>> 0)&0xfff;

   return 'gsDPLoadBlock(' + getTileText(tile_idx) + ', ' + uls + ', ' + ult + ', ' + lrs + ', ' + dxt + ');';
  }
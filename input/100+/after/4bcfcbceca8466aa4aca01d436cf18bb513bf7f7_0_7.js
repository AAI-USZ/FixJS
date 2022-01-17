function disassembleLoadTLut(cmd0,cmd1) {
    var tile_idx = (cmd1>>>24)&0x7;
    var count    = (cmd1>>>14)&0x3ff;

    // NB, in Daedalus, we interpret this similarly to a loadtile command.
    var uls      = (cmd0>>>12)&0xfff;
    var ult      = (cmd0>>> 0)&0xfff;
    var lrs      = (cmd1>>>12)&0xfff;
    var lrt      = (cmd1>>> 0)&0xfff;

    return 'gsDPLoadTLUTCmd(' + getTileText(tile_idx) + ', ' + count + '); //' + uls + ', ' + ult + ', ' + lrs + ', ' + lrt;
  }
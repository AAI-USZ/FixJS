function disassembleTexture(cmd0, cmd1) {

    var xparam  =  (cmd0>>>16)&0xff;
    var level   =  (cmd0>>>11)&0x3;
    var tile    =  (cmd0>>> 8)&0x7;
    var on      =  (cmd0>>> 0)&0xff;
    var s       = ((cmd1>>>16)&0xffff) / (65535.0 * 32.0);
    var t       = ((cmd1>>> 0)&0xffff) / (65535.0 * 32.0);

    if (xparam !== 0) {
      return 'gsSPTextureL(' + s + ', ' + t + ', ' + level + ', ' + xparam + ', ' + tile + ', ' + on + ');';
    }
    return 'gsSPTexture(' + s + ', ' + t + ', ' + level + ', ' + tile + ', ' + on + ');';
  }
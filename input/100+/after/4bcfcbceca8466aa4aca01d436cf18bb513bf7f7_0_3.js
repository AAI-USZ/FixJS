function disassembleTexture(cmd0, cmd1) {

    var xparam  =  (cmd0>>>16)&0xff;
    var level   =  (cmd0>>>11)&0x3;
    var tile    =  (cmd0>>> 8)&0x7;
    var on      =  (cmd0>>> 0)&0xff;
    var s       = calcTextureScale(((cmd1>>>16)&0xffff));
    var t       = calcTextureScale(((cmd1>>> 0)&0xffff));

    var s_text = s.toString();
    var t_text = t.toString();

    if (xparam !== 0) {
      return 'gsSPTextureL(' + s_text + ', ' + t_text + ', ' + level + ', ' + xparam + ', ' + tile + ', ' + on + ');';
    }
    return 'gsSPTexture(' + s_text + ', ' + t_text + ', ' + level + ', ' + tile + ', ' + on + ');';
  }
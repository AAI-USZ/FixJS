function disassembleTexture(cmd0, cmd1) {

    var xparam  =  (cmd0>>>16)&0xff;
    var level   =  (cmd0>>>11)&0x3;
    var tile    =  (cmd0>>> 8)&0x7;
    var on      =  (cmd0>>> 0)&0xff;
    var s       = ((cmd1>>>16)&0xffff) / (65536.0 * 32.0);
    var t       = ((cmd1>>> 0)&0xffff) / (65536.0 * 32.0);

    var s_text = s.toString();
    var t_text = t.toString();

    if (s > 0.0 && s < 1.0) s_text = '1/' + (1.0/s).toString();
    if (t > 0.0 && t < 1.0) t_text = '1/' + (1.0/t).toString();

    if (xparam !== 0) {
      return 'gsSPTextureL(' + s_text + ', ' + t_text + ', ' + level + ', ' + xparam + ', ' + tile + ', ' + on + ');';
    }
    return 'gsSPTexture(' + s_text + ', ' + t_text + ', ' + level + ', ' + tile + ', ' + on + ');';
  }
function executeTexture(cmd0,cmd1) {
    //var xparam  =  (cmd0>>>16)&0xff;
    state.texture.level  =  (cmd0>>>11)&0x3;
    state.texture.tile   =  (cmd0>>> 8)&0x7;
    var enable           =  (cmd0>>> 0)&0xff;
    state.texture.scaleS = calcTextureScale( ((cmd1>>>16)&0xffff) );
    state.texture.scaleT = calcTextureScale( ((cmd1>>> 0)&0xffff) );

    if (enable)
      state.geometryMode |=  geometryModeFlags.G_TEXTURE_ENABLE;
    else
      state.geometryMode &= ~geometryModeFlags.G_TEXTURE_ENABLE;
  }
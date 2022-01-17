function installTexture(tile_idx) {
    var tile         = state.tiles[tile_idx];
    var tmem_address = tile.tmem;

    if (state.tmemLoadMap.hasOwnProperty(tmem_address)) {
      var load_details = state.tmemLoadMap[tmem_address];
      var pitch = load_details.pitch;

      // If loaded via LoadBlock, the pitch isn't set and is deterined via tile.line
      if (pitch == 0xffffffff) {
        if (tile.size === imageSizeTypes.G_IM_SIZ_32b)
          pitch = tile.line << 4;
        else
          pitch = tile.line << 3;
      }

      var width  = getTextureDimension( tile.uls, tile.lrs, tile.mask_s );
      var height = getTextureDimension( tile.ult, tile.lrt, tile.mask_t );

      var textureinfo = loadTexture({
        'tmem':    tile.tmem,
        'palette': tile.palette,
        'address': load_details.address,
        'format':  tile.format,
        'size':    tile.size,
        'width':   width,
        'height':  height,
        'pitch':   pitch,
        'tlutformat': getTextureLUTType(),
        'swapped': load_details.swapped,
        'cm_s':    tile.cm_s,
        'cm_t':    tile.cm_t,
        'mask_s':  tile.mask_s,
        'mask_t':  tile.mask_t,
      });

      textureinfo.left = tile.uls;
      textureinfo.top  = tile.ult;

      return textureinfo;
    }
  }
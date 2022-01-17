function () {
        var map = this.getChildByTag(TAG_TILE_MAP);
        var layer = map.layerNamed("Layer 0");

        //blue diamond
        var tileCoord = cc.ccp(1, 10);
        var flags = layer.tileFlagAt(tileCoord)
        var GID = layer.tileGIDAt(tileCoord);

        // Vertical
        if ((flags & cc.TMXTileVerticalFlag) >>> 0)
            flags = (flags & ~cc.TMXTileVerticalFlag >>> 0) >>> 0;
        else
            flags = (flags | cc.TMXTileVerticalFlag) >>> 0;
        layer.setTileGID(GID, tileCoord, flags);

        tileCoord = cc.ccp(1, 8);
        flags = layer.tileFlagAt(tileCoord)
        GID = layer.tileGIDAt(tileCoord);

        // Vertical
        if ((flags & cc.TMXTileVerticalFlag) >>> 0)
            flags = (flags & ~cc.TMXTileVerticalFlag>>>0) >>> 0;
        else
            flags = (flags | cc.TMXTileVerticalFlag) >>> 0;
        layer.setTileGID(GID, tileCoord, flags);

        tileCoord = cc.ccp(2, 8);
        flags = layer.tileFlagAt(tileCoord)
        GID = layer.tileGIDAt(tileCoord);
        // Horizontal
        if ((flags & cc.TMXTileHorizontalFlag) >>> 0)
            flags = (flags & ~cc.TMXTileHorizontalFlag >>> 0) >>> 0;
        else
            flags = (flags | cc.TMXTileHorizontalFlag) >>> 0;
        layer.setTileGID(GID, tileCoord, flags);
    }
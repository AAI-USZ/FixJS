function () {
        var map = this.getChildByTag(TAG_TILE_MAP);
        var layer = map.layerNamed("Layer 0");

        //blue diamond
        var tileCoord = cc.ccp(1, 10);
        var flags;
        var GID = layer.tileGIDAt(tileCoord, flags);
        // Vertical
        if (flags & cc.TMXTileVerticalFlag)
            flags &= ~cc.TMXTileVerticalFlag;
        else
            flags |= cc.TMXTileVerticalFlag;
        layer.setTileGID(GID, tileCoord, flags);


        tileCoord = cc.ccp(1, 8);
        GID = layer.tileGIDAt(tileCoord, flags);
        // Vertical
        if (flags & cc.TMXTileVerticalFlag)
            flags &= ~cc.TMXTileVerticalFlag;
        else
            flags |= cc.TMXTileVerticalFlag;
        layer.setTileGID(GID, tileCoord, flags);


        tileCoord = ccp(2, 8);
        GID = layer.tileGIDAt(tileCoord, flags);
        // Horizontal
        if (flags & cc.TMXTileHorizontalFlag)
            flags &= ~cc.TMXTileHorizontalFlag;
        else
            flags |= kcc.TMXTileHorizontalFlag;
        layer.setTileGID(GID, tileCoord, flags);
    }
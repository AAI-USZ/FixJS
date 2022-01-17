function (dt) {
        var p = this.tamara.getPositionInPixels();
        var map = this.getChildByTag(TAG_TILE_MAP);

        // there are only 4 layers. (grass and 3 trees layers)
        // if tamara < 48, z=4
        // if tamara < 96, z=3
        // if tamara < 144,z=2

        var newZ = 4 - (p.y / 48);
        newZ = Math.max(newZ, 0);

        map.reorderChild(this.tamara, newZ);
    }
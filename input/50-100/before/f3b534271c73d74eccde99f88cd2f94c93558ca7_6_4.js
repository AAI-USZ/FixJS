function (dt) {
        var p = this.tamara.getPositionInPixels();
        var map = this.getChildByTag(TAG_TILE_MAP);

        // there are only 4 layers. (grass and 3 trees layers)
        // if tamara < 81, z=4
        // if tamara < 162, z=3
        // if tamara < 243,z=2

        // -10: customization for this particular sample
        var newZ = 4 - ((p.y - 10) / 81);
        newZ = Math.max(newZ, 0);

        map.reorderChild(this.tamara, newZ);
    }
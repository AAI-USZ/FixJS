function () {
        this._super();
        //
        // Test orthogonal with 3d camera and anti-alias textures
        //
        // it should not flicker. No artifacts should appear
        //
        var map = cc.TMXTiledMap.create("Resources/TileMaps/orthogonal-test2.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();
        var childrenArray = map.getChildren();
        var child = null;
        for (var i = 0, len = childrenArray.length; i < len; i++) {
            child = childrenArray[i];
            if (!child) break;

            //child.getTexture().setAntiAliasTexParameters();
        }

        var x, y, z;
        map.getCamera().getEyeXYZ(x, y, z);
        map.getCamera().setEyeXYZ(x - 200, y, z + 300);
    }
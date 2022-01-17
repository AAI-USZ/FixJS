function () {
        var map = cc.TMXTiledMap.create("TileMaps/ortho-rotation-test.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();
        cc.Log("ContentSize: %f, %f", s.width, s.height);

        for (var i = 0; i < map.getChildren().length; i++) {
            var child = map.getChildren()[i];
            child.getTexture().setAntiAliasTexParameters();
        }

        var action = cc.ScaleBy.create(2, 0.5);
        map.runAction(action);

        this.schedule(this.flipIt, 1);
    }
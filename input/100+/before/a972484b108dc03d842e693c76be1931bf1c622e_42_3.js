function () {
        this._super();
        var map = cc.TMXTiledMap.create("res/TileMaps/orthogonal-test-vertexz.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();

        // because I'm lazy, I'm reusing a tile as an sprite, but since this method uses vertexZ, you
        // can use any cc.Sprite and it will work OK.
        var layer = map.layerNamed("trees");
        this.tamara = layer.tileAt(cc.p(0, 11));
        cc.Log("vertexZ: " + this.tamara.getVertexZ());

        var move = cc.MoveBy.create(10, cc.pMult(cc.p(400, 450), 1 / cc.CONTENT_SCALE_FACTOR()));
        var back = move.reverse();
        var seq = cc.Sequence.create(move, back, null);
        this.tamara.runAction(cc.RepeatForever.create(seq));

        this.schedule(this.repositionSprite);
    }
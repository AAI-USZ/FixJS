function () {
        this._super();

        // Top Layer, a simple image
        var cocosImage = cc.Sprite.create("powered.png");
        // scale the image (optional)
        cocosImage.setScale(2.5);
        // change the transform anchor point to 0,0 (optional)
        cocosImage.setAnchorPoint(cc.p(0, 0));

        // Middle layer: a Tile map atlas
//        var tilemap = cc.TMXTiledMap.create("TileMaps/orthogonal-test2.tmx");
        var tilemap = cc.TileMapAtlas.create("TileMaps/tiles.png", "TileMaps/levelmap.tga", 16, 16);

        // change the transform anchor to 0,0 (optional)
        tilemap.setAnchorPoint(cc.p(0, 0));

        // Anti Aliased images
        tilemap.getTexture().setAntiAliasTexParameters();

        // background layer: another image
        var background = cc.Sprite.create("background.png");
        // scale the image (optional)
        background.setScale(1.5);
        // change the transform anchor point (optional)
        background.setAnchorPoint(cc.p(0, 0));


        // create a void node, a parent node
        var voidNode = cc.ParallaxNode.create();

        // NOW add the 3 layers to the 'void' node

        // background image is moved at a ratio of 0.4x, 0.5y
        voidNode.addChild(background, -1, cc.p(0.4, 0.5), cc.p(0,0));

        // tiles are moved at a ratio of 2.2x, 1.0y
        voidNode.addChild(tilemap, 1, cc.p(2.2, 1.0), cc.p(0, 0));

        // top image is moved at a ratio of 3.0x, 2.5y
        voidNode.addChild(cocosImage, 2, cc.p(3.0, 2.5), cc.p(0, 0));


        // now create some actions that will move the 'void' node
        // and the children of the 'void' node will move at different
        // speed, thus, simulation the 3D environment
        var goUp = cc.MoveBy.create(4, cc.p(0, 100));
        var goDown = goUp.reverse();
        var go = cc.MoveBy.create(8, cc.p(200, 0));
        var goBack = go.reverse();
        var seq = cc.Sequence.create(goUp, go, goDown, goBack );
        voidNode.runAction((cc.RepeatForever.create(seq) ));

        this.addChild(voidNode);
    }
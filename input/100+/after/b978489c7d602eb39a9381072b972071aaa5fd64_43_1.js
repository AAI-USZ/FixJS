function () {
        this.setTouchEnabled(true);

        // Top Layer, a simple image
        var cocosImage = cc.Sprite.create(s_power);
        // scale the image (optional)
        cocosImage.setScale(0.5);
        // change the transform anchor point to 0,0 (optional)
        cocosImage.setAnchorPoint(cc.ccp(0, 0));


        // Middle layer: a Tile map atlas
        //var tilemap = cc.TileMapAtlas.create(s_tilesPng, s_levelMapTga, 16, 16);
        var tilemap = cc.TMXTiledMap.create("Resources/TileMaps/orthogonal-test2.tmx");

        // change the transform anchor to 0,0 (optional)
        tilemap.setAnchorPoint(cc.ccp(0, 0));

        // Anti Aliased images
        //tilemap.getTexture().setAntiAliasTexParameters();


        // background layer: another image
        var background = cc.Sprite.create(s_back);
        // scale the image (optional)
        //background.setScale(1.5);
        // change the transform anchor point (optional)
        background.setAnchorPoint(cc.ccp(0, 0));


        // create a void node, a parent node
        var voidNode = cc.ParallaxNode.create();

        // NOW add the 3 layers to the 'void' node

        // background image is moved at a ratio of 0.4x, 0.5y
        voidNode.addChild(background, -1, cc.ccp(0.4, 0.5), cc.PointZero());

        // tiles are moved at a ratio of 1.0, 1.0y
        voidNode.addChild(tilemap, 1, cc.ccp(1.0, 1.0), cc.ccp(0, 0));

        // top image is moved at a ratio of 3.0x, 2.5y
        voidNode.addChild(cocosImage, 2, cc.ccp(3.0, 2.5), cc.ccp(0, 0));
        this.addChild(voidNode, 0, TAG_NODE);

    }
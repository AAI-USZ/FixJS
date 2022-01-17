function () {
        this._super();

        var platform = __getPlatform();
        if( platform.substring(0,7) == 'desktop' )
            this.setMouseEnabled( true );
        else if( platform.substring(0,6) == 'mobile' )
            this.setTouchEnabled( true );

        // Top Layer, a simple image
        var cocosImage = cc.Sprite.create("powered.png");
        // scale the image (optional)
        cocosImage.setScale(1.5);
        // change the transform anchor point to 0,0 (optional)
        cocosImage.setAnchorPoint(cc.p(0, 0));


        // Middle layer: a Tile map atlas
        var tilemap = cc.TileMapAtlas.create("TileMaps/tiles.png", "TileMaps/levelmap.tga", 16, 16);

        // change the transform anchor to 0,0 (optional)
        tilemap.setAnchorPoint( cc.p(0, 0) );

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
        voidNode.addChild(tilemap, 1, cc.p(2.2, 1.0), cc.p(0, -200));

        // top image is moved at a ratio of 3.0x, 2.5y
        voidNode.addChild(cocosImage, 2, cc.p(3.0, 2.5), cc.p(200, 800));
        this.addChild(voidNode, 0, TAG_NODE);

    }
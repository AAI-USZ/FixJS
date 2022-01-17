function () {
        var size = cc.Director.sharedDirector().getWinSize();

        // create sprites
        var bg = cc.Sprite.create("res/Images/HelloWorld.png");
        bg.setPosition(cc.PointMake(size.width / 2, size.height / 2));
        //bg.setScale(1.7);

        var s1 = cc.Sprite.create("res/Images/grossini.png");
        var s2 = cc.Sprite.create("res/Images/grossini_dance_01.png");
        var s3 = cc.Sprite.create("res/Images/grossini_dance_02.png");
        var s4 = cc.Sprite.create("res/Images/grossini_dance_03.png");
        var s5 = cc.Sprite.create("res/Images/grossini_dance_04.png");
        var s6 = cc.Sprite.create("res/Images/grossini_dance_05.png");
        var s7 = cc.Sprite.create("res/Images/grossini_dance_06.png");
        var s8 = cc.Sprite.create("res/Images/grossini_dance_07.png");
        var s9 = cc.Sprite.create("res/Images/grossini_dance_08.png");
        var s10 = cc.Sprite.create("res/Images/grossini_dance_09.png");
        var s11 = cc.Sprite.create("res/Images/grossini_dance_10.png");
        var s12 = cc.Sprite.create("res/Images/grossini_dance_11.png");
        var s13 = cc.Sprite.create("res/Images/grossini_dance_12.png");
        var s14 = cc.Sprite.create("res/Images/grossini_dance_13.png");
        var s15 = cc.Sprite.create("res/Images/grossini_dance_14.png");

        // just loading textures to slow down
        var s16 = cc.Sprite.create("res/Images/background1.png");
        var s17 = cc.Sprite.create("res/Images/background2.png");
        var s18 = cc.Sprite.create("res/Images/background3.png");
        var s19 = cc.Sprite.create("res/Images/blocks.png");

        s1.setPosition(cc.PointMake(50, 50));
        s2.setPosition(cc.PointMake(60, 50));
        s3.setPosition(cc.PointMake(70, 50));
        s4.setPosition(cc.PointMake(80, 50));
        s5.setPosition(cc.PointMake(90, 50));
        s6.setPosition(cc.PointMake(100, 50));

        s7.setPosition(cc.PointMake(50, 180));
        s8.setPosition(cc.PointMake(60, 180));
        s9.setPosition(cc.PointMake(70, 180));
        s10.setPosition(cc.PointMake(80, 180));
        s11.setPosition(cc.PointMake(90, 180));
        s12.setPosition(cc.PointMake(100, 180));

        s13.setPosition(cc.PointMake(50, 270));
        s14.setPosition(cc.PointMake(60, 270));
        s15.setPosition(cc.PointMake(70, 270));

        this.addChild(bg);

        this.addChild(s1);
        this.addChild(s2);
        this.addChild(s3);
        this.addChild(s4);
        this.addChild(s5);
        this.addChild(s6);
        this.addChild(s7);
        this.addChild(s8);
        this.addChild(s9);
        this.addChild(s10);
        this.addChild(s11);
        this.addChild(s12);
        this.addChild(s13);
        this.addChild(s14);
        this.addChild(s15);
    }
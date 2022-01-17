function () {
        var s;

        // Left
        var label1 = cc.LabelBMFont.create("Multi line\nLeft", "res/fonts/bitmapFontTest3.fnt");
        label1.setAnchorPoint(cc.p(0, 0));
        this.addChild(label1, 0, TAG_BITMAP_ATLAS1);

        s = label1.getContentSize();
        cc.Log("content size:" + s.width + "," + s.height);


        // Center
        var label2 = cc.LabelBMFont.create("Multi line\nCenter", "res/fonts/bitmapFontTest3.fnt");
        label2.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(label2, 0, TAG_BITMAP_ATLAS2);

        s = label2.getContentSize();
        cc.Log("content size:" + s.width + "," + s.height);

        // right
        var label3 = cc.LabelBMFont.create("Multi line\nRight\nThree lines Three", "res/fonts/bitmapFontTest3.fnt");
        label3.setAnchorPoint(cc.p(1, 1));
        this.addChild(label3, 0, TAG_BITMAP_ATLAS3);

        s = label3.getContentSize();
        cc.Log("content size:" + s.width + "," + s.height);

        s = cc.Director.getInstance().getWinSize();
        label1.setPosition(cc.p(0, 0));
        label2.setPosition(cc.p(s.width / 2, s.height / 2));
        label3.setPosition(cc.p(s.width, s.height));
    }
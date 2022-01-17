function () {
        var s = cc.Director.sharedDirector().getWinSize();

        // cc.LabelBMFont
        var center = cc.LabelTTF.create("word wrap \"testing\" (bla0) bla1 'bla2' [bla3] (bla4) {bla5} {bla6} [bla7] (bla8) [bla9] 'bla0' \"bla1\"",
            cc.SizeMake(s.width / 2, 200), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP, "Marker Felt", 32);
        center.setPosition(cc.ccp(s.width / 2, 150));

        this.addChild(center);
    }
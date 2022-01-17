function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(SysMenu.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2,scene));
    }
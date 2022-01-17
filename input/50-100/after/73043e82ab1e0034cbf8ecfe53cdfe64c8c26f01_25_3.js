function (sender) {
        var s = new TransitionsTestScene();

        var layer = new TestLayer1();
        s.addChild(layer);

        var scene = backTransitionAction(TRANSITION_DURATION, s);
        if (scene) {
            cc.Director.sharedDirector().replaceScene(scene);
        }
    }
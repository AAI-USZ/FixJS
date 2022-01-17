function (sender) {
        var s = new TransitionsTestScene();

        var layer = new TestLayer2();
        s.addChild(layer);
        var scene = restartTransitionAction(TRANSITION_DURATION, s)

        if (scene) {
            cc.Director.sharedDirector().replaceScene(scene);
        }
    }
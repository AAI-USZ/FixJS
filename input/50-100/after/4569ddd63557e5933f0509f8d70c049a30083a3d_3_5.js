function (sender) {
        transitionsIdx++;
        transitionsIdx = transitionsIdx % TransitionsTests.length;

        var s = new TransitionsTestScene();

        var layer = new TestLayer1();
        s.addChild(layer);

        var scene = TransitionsTests[transitionsIdx].transitionFunc(TRANSITION_DURATION, s);
        if (scene) {
            cc.Director.sharedDirector().replaceScene(scene);
        }
    }
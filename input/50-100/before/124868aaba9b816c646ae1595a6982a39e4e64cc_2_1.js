function () {
        // initialize director
        var pDirector = cc.Director.sharedDirector();

        // enable High Resource Mode(2x, such as iphone4) and maintains low resource on other devices.
//     pDirector->enableRetinaDisplay(true);

        // turn on display FPS
        pDirector.setDisplayFPS(true);

        // pDirector->setDeviceOrientation(kCCDeviceOrientationLandscapeLeft);

        // set FPS. the default value is 1.0/60 if you don't call this
        pDirector.setAnimationInterval(1.0 / 60);

        // create a scene. it's an autorelease object
        var pScene = Game.scene();
        //var pScene = GameLayer.scene();

        // run
        pDirector.runWithScene(pScene);
        return true;
    }
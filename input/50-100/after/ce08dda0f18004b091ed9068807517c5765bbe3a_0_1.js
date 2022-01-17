function () {
        // initialize director
        var director = cc.Director.sharedDirector();

        // enable High Resource Mode(2x, such as iphone4) and maintains low resource on other devices.
//     director->enableRetinaDisplay(true);

        // turn on display FPS
        director.setDisplayStats(true);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / 60);

        // create a scene. it's an autorelease object
        var scene = Helloworld.scene();

        // run
        director.runWithScene(scene);

        return true;
    }
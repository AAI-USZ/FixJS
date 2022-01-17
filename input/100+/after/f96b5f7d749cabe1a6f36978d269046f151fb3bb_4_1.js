function () {
    var d = document;
    var c = {
        menuType:'canvas', //wether to use canvas mode menu or dom menu
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:true,
        showFPS:true,
        frameRate:60,
        tag:'gameCanvas', //the dom element to run cocos2d on
        engineDir:'../cocos2d/',
        appFiles:[//'Classes/AppDelegate.js',
            'testbasic.js',
            'testResource.js',
            'Classes/tests/TouchesTest/Ball.js',
            'Classes/tests/TouchesTest/Paddle.js',
            'Classes/tests/TouchesTest/TouchesTest.js',
            'Classes/tests/SchedulerTest/SchedulerTest.js',
            'Classes/tests/ClickAndMoveTest/ClickAndMoveTest.js',
            'Classes/tests/MenuTest/MenuTest.js',
            'Classes/tests/MultiTouchTest/MultiTouchTest.js',
            'Classes/tests/ActionsTest/ActionsTest.js',
            'Classes/tests/TileMapTest/TileMapTest.js',
            'Classes/tests/TransitionsTest/TransitionsTest.js',
            'Classes/tests/DrawPrimitivesTest/DrawPrimitivesTest.js',
            'Classes/tests/ParticleTest/ParticleTest.js',
            'Classes/tests/ProgressActionsTest/ProgressActionsTest.js',
            'Classes/tests/LayerTest/LayerTest.js',
            'Classes/tests/SceneTest/SceneTest.js',
            'Classes/tests/TextureCacheTest/TextureCacheTest.js',
            'Classes/tests/SpriteTest/SpriteTest.js',
            'Classes/tests/CocosDenshionTest/CocosDenshionTest.js',
            'Classes/tests/CocosNodeTest/CocosNodeTest.js',
            'Classes/tests/RotateWorldTest/RotateWorldTest.js',
            'Classes/tests/IntervelTest/IntervelTest.js',
            'Classes/tests/ActionManagerTest/ActionManagerTest.js',
            'Classes/tests/EaseActionsTest/EaseActionsTest.js',
            'Classes/tests/ParallaxTest/ParallaxTest.js',
            'Classes/tests/DirectorTest/DirectorTest.js',
            'Classes/tests/PerformanceTest/PerformanceTest.js',
            'Classes/tests/PerformanceTest/PerformanceSpriteTest.js',
            'Classes/tests/PerformanceTest/PerformanceParticleTest.js',
            'Classes/tests/PerformanceTest/PerformanceNodeChildrenTest.js',
            'Classes/tests/PerformanceTest/PerformanceTextureTest.js',
            'Classes/tests/FontTest/FontTest.js',
            'Classes/tests/PerformanceTest/PerformanceTouchesTest.js',
            'Classes/tests/LabelTest/LabelTest.js',
            'Classes/tests/CurrentLanguageTest/CurrentLanguageTest.js',
            'Classes/tests/TextInputTest/TextInputTest.js',
            'Classes/tests/Box2dTest/Box2dTest.js']
    };
    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        s.src = c.engineDir + 'platform/jsloader.js';
        d.body.appendChild(s);
        s.c = c;
        s.id = 'cocos2d-html5';
        //else if single file specified, load singlefile
    });
}
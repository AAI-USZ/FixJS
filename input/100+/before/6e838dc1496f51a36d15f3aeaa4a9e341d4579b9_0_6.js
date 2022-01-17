function run()
{
    // update globals
    _winSize = director.winSize();
    winSize = {width:_winSize[0], height:_winSize[1]};
    centerPos = cc.p( winSize.width/2, winSize.height/2 );

    var scene = cc.Scene.create();

    // main menu
    var menu = new MainMenu();
    scene.addChild( menu);

    // game
//    var layer = new GameLayer();
//    scene.addChild( layer );

    var runningScene = director.getRunningScene();
    if( runningScene == null )
        director.runWithScene( scene );
    else
        director.replaceScene( cc.TransitionFade.create(0.5, scene ) );
}
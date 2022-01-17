function drawMap(){
    for(name in scene){
        scene[name] = new Container();
        scene[name].visible = false;
        stage.addChild(scene[name]);
    }

    prepareScene();

    Ticker.addListener(window);
    Ticker.useRAF = true;
    // Best Framerate targeted (60 FPS)
    Ticker.setInterval(17);


    //进入选择入口场景
    //showScene("enter");

}
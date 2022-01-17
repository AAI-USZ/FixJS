function showWood(n, dis){
    setWoodParam(n, "dis", dis);
    setWood(n, "visible", false);
    if(woodMan[n].over){
        alphaWood(n, 1);
        woodMan[n].face.visible = true;
    }
    else{
        //alphaWood(n, 1);
        woodMan[n].back.visible = true;
    }
    var scaleValue = 1 - dis*0.004,
        yValue = woodMan[n].oriY - dis*6.8;

    var animTime = 60 * Math.abs( (yValue - woodMan[n].back.y)/yValue);
    animTime = animTime > 180 ? 180 : parseInt(animTime, 10);
    animTime = animTime < 32 ? 32 : animTime;

    setWoodAnim(n, "y", yValue, animTime, true);
    setWoodAnim(n, "scaleX", scaleValue, animTime);
    setWoodAnim(n, "scaleY", scaleValue, animTime);
    setWoodParam(n, "scaleY", 1 - dis*0.004);

}
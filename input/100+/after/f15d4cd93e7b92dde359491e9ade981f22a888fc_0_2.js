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
        yValue = woodMan[n].oriY - dis*5.85;

    setWood(n, "y", yValue);
    setWood(n, "scaleX", scaleValue);
    setWood(n, "scaleY", scaleValue);
    setWoodParam(n, "scaleY", 1 - dis*0.004);

}
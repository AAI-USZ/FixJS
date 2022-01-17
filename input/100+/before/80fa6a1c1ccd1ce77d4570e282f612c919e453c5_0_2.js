function setWoodAnim(n, type, value, execCallback){
    if(value == woodMan[n].back[type]){
        return;
    }

    var animTime = 60 * Math.abs( (value - woodMan[n].back[type])/value);
    animTime = animTime > 180 ? 180 : parseInt(animTime, 10);
    animTime = animTime < 32 ? 32 : animTime;
    woodMan[n].back.walk();
    woodMan[n].back.anim(type, value, animTime, execCallback ? function(){
        woodMan[n].back.stop();
    } : null);
}
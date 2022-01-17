function setWoodAnim(n, type, value, animTime, execCallback){
    if(value == woodMan[n].back[type]){
        return;
    }
    woodMan[n].back.walk();
    woodMan[n].back.anim(type, value, animTime, execCallback ? function(){
        woodMan[n].back.stop();
    } : null);
}
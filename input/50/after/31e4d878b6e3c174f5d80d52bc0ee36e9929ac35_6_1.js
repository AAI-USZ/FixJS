function () {
    if(cc.s_sharedAnimationCache){
        cc.s_sharedAnimationCache._animations = null;
        cc.s_sharedAnimationCache = null;
    }
}
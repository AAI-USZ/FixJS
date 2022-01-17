function () {
    cc.log("play effect repeatly");
    soundId = cc.AudioEngine.getInstance().playEffect(EFFECT_FILE, true);
}
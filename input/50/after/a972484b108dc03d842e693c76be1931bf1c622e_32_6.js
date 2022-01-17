function () {
    if (cc.AudioEngine.getInstance().isBackgroundMusicPlaying()) {
        cc.log("background music is playing");
    }
    else {
        cc.log("background music is not playing");
    }
}
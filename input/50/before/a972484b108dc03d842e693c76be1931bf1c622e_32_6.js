function () {
    if (cc.AudioEngine.getInstance().isBackgroundMusicPlaying()) {
        cc.Log("background music is playing");
    }
    else {
        cc.Log("background music is not playing");
    }
}
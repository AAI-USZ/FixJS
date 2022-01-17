function () {
    cc.Log("sub effects volume");
    cc.AudioEngine.getInstance().setEffectsVolume(cc.AudioEngine.getInstance().getEffectsVolume() - 0.1);
}
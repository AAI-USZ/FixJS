function () {
    cc.Log("add bakcground music volume");
    cc.AudioEngine.getInstance().setBackgroundMusicVolume(cc.AudioEngine.getInstance().getBackgroundMusicVolume() + 0.1);
}
function () {
    cc.Log("sub backgroud music volume");
    cc.AudioEngine.getInstance().setBackgroundMusicVolume(cc.AudioEngine.getInstance().getBackgroundMusicVolume() - 0.1);
}
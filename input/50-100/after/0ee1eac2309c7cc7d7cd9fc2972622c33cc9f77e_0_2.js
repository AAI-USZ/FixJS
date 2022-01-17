function() {
	if(mplayer != undefined) {
		var newVol = (volume - 3) > 100 ? 100 : (volume - 3);
		mplayer.stdin.write("set_property volume " + newVol + " 1");
		setTimeout(MPlayer.getVolume, 1000);
	}
}
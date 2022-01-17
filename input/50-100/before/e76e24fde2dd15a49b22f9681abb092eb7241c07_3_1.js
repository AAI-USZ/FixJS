function(path) {
		CHANNELS_CONF_FILE = path;
		VLC_COMMANDLINE = 'cvlc ' + CHANNELS_CONF_FILE + ' --sout "#transcode{vcodec=theo,vb=400,scale=1,acodec=vorb,ab=128,channels=2,samplerate=44100}:http{dst=:' + VLC_STREAM_PORT + '/tv.ogg}" --sout-keep -I http --http-port ' + VLC_HTTP_PORT;
	}
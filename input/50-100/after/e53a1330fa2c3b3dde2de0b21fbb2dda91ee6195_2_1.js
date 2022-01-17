function(params) {
		if(params.streamPort){
			VLC_STREAM_URL = 'http://localhost:' + params.streamPort + '/tv.ogg';
		}
		if(params.path){
			CHANNELS_CONF_FILE = params.path;
		}
		VLC_COMMANDLINE = 'cvlc ' + CHANNELS_CONF_FILE + ' --sout "#transcode{vcodec=theo,vb='+(params.bitrate?params.bitrate:VLC_TRANSCODE_BITRATE)+',scale=1,acodec=vorb,ab=128,channels=2,samplerate=44100}:http{dst=:' + (params.streamPort?params.streamPort:VLC_STREAM_PORT) + '/tv.ogg}" --sout-keep -I http --http-port ' + (params.rcHttpPort?params.rcHttpPort:VLC_HTTP_PORT);

	}
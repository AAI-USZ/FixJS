function mabimml_genmidi(param) {
		// param.inst midi楽器番号(0-127)
		// param.mml mml文字列の配列
		var nMin = 16, nMax = 88;

		if (param.min || param.max){
			nMin = param.min;
			nMax = param.max;
		}
		var inst = (param.inst && param.inst >= 0 && param.inst < 128) ? Math.round(param.inst) : 0;
		var pan = (param.pan && param.pan >= 0 && param.pan < 128) ? Math.round(param.pan) : 64;
		var effect = (param.effect && param.effect >= 0 && param.effect < 128) ? Math.round(param.effect) : 40;

		var ret = String.fromCharCode(
			0x4D, 0x54, 0x68, 0x64,		// chunk ID "MThd"
			0x00, 0x00, 0x00, 0x06,		// chunk size
			0x01, 0x00,					// format type (Midi format1)
			0x00, param.mml.length,		// number of tracks
			0x00, dLength				// ticks per beat
		);
		// Master Track
		//ret += genMasterTrack();
		for(var part = 0; part < param.mml.length; part++) {	// パートごとに処理
			ret += genTrack(param.mml[part], part, inst, pan, effect, nMin, nMax);
		}
		// dataを返す
		return ret;
	}
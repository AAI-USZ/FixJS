function(res, onload, onerror) {
			// fore lowercase for the resource name
			res.name = res.name.toLowerCase();
			// check ressource type
			switch (res.type) {
				case "binary":
					// reuse the preloadImage fn
					preloadBinary(res, onload, onerror);
					return 1;

				case "image":
					// reuse the preloadImage fn
					preloadImage(res, onload, onerror);
					return 1;

				case "tmx":
					preloadXML(res, true, onload, onerror);
					return 1;
				
				case "audio":
					me.audio.setLoadCallback(onload);
					// only load is sound is enable
					if (me.audio.isAudioEnable()) {
						me.audio.load(res);
						return 1;
					}
					break;

				default:
					throw "melonJS: me.loader.load : unknow or invalide resource type : %s"	+ res.type;
					break;
			};
			return 0;
		}
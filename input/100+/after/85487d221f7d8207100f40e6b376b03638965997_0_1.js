function(res, onload, onerror) {
			// fore lowercase for the resource name
			res.name = res.name.toLowerCase();
			// check ressource type
			switch (res.type) {
				case "binary":
					// reuse the preloadImage fn
					preloadBinary.call(this, res, onload, onerror);
					return 1;

				case "image":
					// reuse the preloadImage fn
					preloadImage.call(this, res, onload, onerror);
					return 1;

				case "tmx":
					preloadXML.call(this, res, true, onload, onerror);
					// increase the resourceCount by 1
					// allowing to add the loading of level in the 
					// levelDirector as part of the loading progress
					tmxCount += 1;
					return 2;
				
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
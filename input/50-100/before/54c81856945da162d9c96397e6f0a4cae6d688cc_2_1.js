function checkLoadStatus() {
			// remove tmxCount from the total resource to be loaded
			// as we will after load each TMX into the level director
			if (loadCount == (resourceCount - tmxCount)) {

				// add all TMX level into the level Director
				for ( var xmlObj in xmlList) {
					if (xmlList[xmlObj].isTMX) {
						// load the level into the levelDirector
						me.levelDirector.addTMXLevel(xmlObj);
						//progress notification
						obj.onResourceLoaded();
					}
				}

				// wait 1/2s and execute callback (cheap workaround to ensure everything is loaded)
				if (obj.onload) {
					timerId = setTimeout(obj.onload, 300);
				} else
					alert("no load callback defined");
			} else {
				timerId = setTimeout(checkLoadStatus, 100);
			}
		}
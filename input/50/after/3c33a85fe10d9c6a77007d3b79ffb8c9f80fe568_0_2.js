function() {
			for (var i=0, c; (c=enyo.BingMap.scriptLoadedCbs[i]); i++) {
				c();
			}
			enyo.BingMap.scriptLoadedCbs = [];
		}
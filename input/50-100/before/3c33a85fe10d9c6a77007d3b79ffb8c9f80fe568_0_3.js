function(inCallback) {
			if (window["Microsoft"] && window["Microsoft"]["Maps"]) {
				inCallback && inCallback();
			} else {
				this.scriptLoadedCbs.push(inCallback);
				if (!this.alreadyCalled) {
					this.alreadyCalled =  true;
					this.addScript();
				}
			}
		}
function () {
				if(!that.db) {
					that.consoleOutput = true;
				} else {
					console.log('waited 500');
					that._reLog(param_logMessage, param_cb);
				}
			}
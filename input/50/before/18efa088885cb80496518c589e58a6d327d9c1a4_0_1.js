function () {
				if(!that.db) {
					that.consoleOutput = true;
				} else {
					that._reLog(param_logMessage, param_cb);
				}
			}
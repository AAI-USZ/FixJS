function (param_logMessage, param_cb) {
		this.openLogSaves++;
		if (!this.consoleOutput) {
			this._logToDb(param_logMessage, param_cb);
		} else {
			this._logToConsole(param_logMessage);
		}
	}
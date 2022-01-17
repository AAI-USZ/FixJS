function (injectExCommand, arg) {
			if (!this.isAsync) return;

			injectExCommand && arg && this.commands.unshift([injectExCommand, arg]);

			if (this.commands.length) {
				setTimeout((function (obj, fn, cmd) {return function () {
					if (obj._isClipboardAccess(cmd[1])) {
						extensionChannel.getClipboard(function () {fn.call(obj);});
					}
					else {
						fn.call(obj);
					}
				}})(this, this._runAsyncWrapper, this.commands[0]), 0);
			}
			else {
				if (this.editLogLevel > 0) {
					editLogger.close();
					this.isRunning = false;
					this.editLogLevel--;
				}
				this.onFinish && this.onFinish(this);
				var e = document.createEvent('UIEvent');
				e.initUIEvent('wasavi_command', false, true, document.defaultView, 0);
				processInput(0, e);
			}
		}
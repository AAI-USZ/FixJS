function () {
			if (this.commands.length == 0) return;

			if (this.isAsync && this.isRoot && isInteractive) {
				//console.log('*** starting ExCommandExecutor (async:' + this.editLogLevel + ') ***');
				if (this.editLogLevel == 0) {
					editLogger.open('excommand');
					this.isRunning = true;

					this.editLogLevel++;
				}
				this.runAsyncNext();
			}
			else {
				this.isRunning = true;
				if (this.isRoot) {
					editLogger.open('excommand');
				}
				try {
					for (var i = 0, goal = this.commands.length; i < goal; i++) {
						if (!this._runCore(this.commands[i][0], this.commands[i][1])) {
							return this.lastError;
						}
					}
				}
				finally {
					if (this.isRoot) {
						editLogger.close();
						this.onFinish && this.onFinish(this);
					}
					this.commands.length = 0;
					this.isRunning = false;
				}
				return true;
			}
		}
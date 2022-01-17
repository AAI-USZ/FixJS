function(){
				this.scope._loggerNotifierId = ++this.module._notifiers;
				this.module._log('initializing notifier #' + this.scope._loggerNotifierId);
				return this.supr.apply(this.scope, arguments);
			}
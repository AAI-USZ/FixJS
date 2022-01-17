function(){
				this.supr.apply(this.scope, arguments);
				this.scope._loggerNotifierId = ++this.module._notifiers;
				this.module._log('initialized notifier #' + this.scope._loggerNotifierId);
			}
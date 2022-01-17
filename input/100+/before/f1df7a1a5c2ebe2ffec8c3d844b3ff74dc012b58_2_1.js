function(config){
			if (config && config.clientId){
				this._set('clientId', config.clientId);	
			} else {
				var generatedId = this.constructor.NAME + '_' +  (++Y.Task.lastCount);
				this._set('clientId', generatedId);
			}
		}
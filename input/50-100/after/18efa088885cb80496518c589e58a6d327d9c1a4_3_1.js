function (param_settings) {
	events.EventEmitter.call(this);

	if(cluster.isMaster) {
		if(!this.uuid) {
			this.uuid = this._generateUuid();	
		};
		if (param_settings) {
			this.logTarget = param_settings.logTarget;
			if(param_settings.uuid) {
				this.uuid = param_settings.uuid;
			};
		};
	};
}
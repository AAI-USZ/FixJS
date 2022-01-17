function(data) {
		
			this.getName();
			var field = this.constructor.getKey();
			this._isSaved = ((data || {}).hasOwnProperty(field) && !(data || {}).hasOwnProperty('_unsaved')) ? true : false;
			this.id = (data || {}).hasOwnProperty(field) ? data[field] : null;
			this.data = data || {};
			this.hasChanges = false;
			this.fields = this.constructor.getFields();
			this.events = [];
			
			this.events.push(this.constructor.on('datachange', Class.proxy(this.mergeDelta, this)));
			this.events.push(this.constructor.on('datasync', Class.proxy(this.syncDelta, this)));
		}
function(model, data) {
			
			this.model = model
			this.data = data;
			this.active = data;
			this.list = this.toArray();
			this.events = [];
			this.eventTarget = new Events(null, this);
			
			this.events.push(this.model.on('datachange', Class.proxy(this.mergeDeltas, this)));
			this.events.push(this.model.on('datasync', Class.proxy(this.syncDeltas, this)));

		}
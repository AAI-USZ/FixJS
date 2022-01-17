function(type, instance, method) {
		this.subscribers[type] = this.subscribers[type] || [];
		this.subscribers[type].push({instance: instance, method: method || "handleEvent"});
	}
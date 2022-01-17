function(type, instance) {
		if (this.subscribers[type]) {
			var subscribers = this.subscribers[type], i = subscribers.length;

			while (i--) {
				if (subscribers[i].instance === instance) {
					subscribers.splice(i, 1);
				}
			}

			subscribers = instance = null;
		}
	}
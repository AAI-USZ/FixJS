function(data) {
			if(data) {
				this.nameEl.text(data.name);
				this.fire("reconnect", this.base_uri);
			}
		}
function(e) {
			var delta = e.data;
			if (this.id && delta.id == this.id) {
				if (delta.action == 'set') this.data = delta.item;
				else if (delta.action == 'delete') this.destroy();
			}
		}
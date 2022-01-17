function(e) {
			
			console.log("syncing deltas");
			
			var delta = e.data;
			
			if (this.data.hasOwnProperty(delta.oldId)) {
				
				var item = this.data['c' + delta.oldId];
				delete this.data['c' + delta.oldId];
				this.data[delta.id] = item;
				this.data[delta.id][this.model.getKey()] = delta.id;
				if (this.data[delta.id]['_unsaved']) delete this.data[delta.id]['_unsaved'];
				
				if (this.active.hasOwnProperty(delta.oldId)) {
					delete this.active[delta.oldId]
					this.active[delta.id] = item;
				}
				
				this.list = this.toArray();
			}
			
		}
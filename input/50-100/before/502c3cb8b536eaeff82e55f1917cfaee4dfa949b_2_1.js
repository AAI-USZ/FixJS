function() {
			
			// unload children
			for (var name in this.views) {
				this.views[name].unload();
			}
		
			// run functions
			console.log(this.data.name + ' ' + "Unload");
		
			// fire unloaded event
			this.fire('_unloaded');
		
		}
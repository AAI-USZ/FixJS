function() {
			
			// unload children
			for (var name in this.views) {
				this.views[name].unload();
			}
		
			// run functions
			console.log(this.data.name + ' ' + "Unload");
			this.target.remove();
		
			// fire unloaded event
			this.fire('_unloaded');
		
		}
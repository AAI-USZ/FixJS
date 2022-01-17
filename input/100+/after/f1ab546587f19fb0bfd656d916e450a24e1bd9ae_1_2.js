function(payload){
			if(!this.isMyJob(payload))
				return;
			if(this.shape){
				var path = this.shape.attrs.path;
				this.shape.attr('path', path +'Z');
				view.chassis = this.shape;
				this.trigger(Events.CHASSIS_SHAPE_UPDATED, {shape: this.shape});
				this.shape = null;
			}
		}
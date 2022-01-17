function(payload) {
			if(self.isMyJob(payload)){
				self.trigger(Events.CHASSIS_SHAPE_UPDATED, {shape: view.chassis});
			}
		}
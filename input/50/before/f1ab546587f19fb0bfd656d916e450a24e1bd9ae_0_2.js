function(payload) {
			self.trigger(Events.CHASSIS_SHAPE_UPDATED, {shape: view.chassis});
		}
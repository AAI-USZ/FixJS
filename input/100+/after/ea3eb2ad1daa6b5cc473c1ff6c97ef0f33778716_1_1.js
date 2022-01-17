function Preview3DHandler(view, options) {
	
	var self = {
		appEvents: ['chassisShapeUpdated', 'wheelUpdated'],
		wheels: {},
		
		chassisShapeUpdated: function(payload) {
			self.chassis = new Chassis3D(payload.shape, 50);
			var robot = new Robot3D(self.chassis, self.wheels);
			view.updateRobot(robot);			
		},
		
		wheelUpdated: function(payload) {
			var w = payload.wheel;
			var w3 = new Wheel3D(w.elem);
			self.wheels[w.id] = w3;
			var robot = new Robot3D(self.chassis, self.wheels);
			view.updateRobot(robot);			
		},
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
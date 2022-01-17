function Preview3DHandler(view, options) {
	
	var self = {
		appEvents: ['chassisShapeUpdated', 'wheelUpdated'],
		wheels: {},
		
		chassisShapeUpdated: function(payload) {
			self.chassis = new Chassis3D(payload.shape, 50);
			var robot = self.buildRobot3D();
			view.updateRobot(robot);			
		},
		
		wheelUpdated: function(payload) {
			var w = payload.wheel;
			var w3 = new Wheel3D(w.elem);
			self.wheels[w.id] = w3;
			var robot = self.buildRobot3D();
			view.updateRobot(robot);			
		},
		
		buildRobot3D: function() {
			var geometry = new THREE.Geometry();
			THREE.GeometryUtils.merge(geometry, self.chassis);
			for(var id in self.wheels)
			{
				if(self.wheels.hasOwnProperty(id)){
					THREE.GeometryUtils.merge(geometry, self.wheels[id]);
				}
			}

			THREE.GeometryUtils.center(geometry);
			var robot = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial());
			robot.rotation.x = Math.PI/2;
			return robot;
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
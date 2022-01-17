function(payload) {
			self.chassis = new Chassis3D(payload.shape, 50);
			var robot = self.buildRobot3D();
			view.updateRobot(robot);			
		}
function(payload) {
			self.chassis = new Chassis3D(payload.shape, 50);
			var robot = new Robot3D(self.chassis, self.wheels);
			view.updateRobot(robot);			
		}
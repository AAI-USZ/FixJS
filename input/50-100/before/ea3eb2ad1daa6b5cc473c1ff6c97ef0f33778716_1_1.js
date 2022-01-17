function(payload) {
			var w = payload.wheel;
			var w3 = new Wheel3D(w.elem);
			self.wheels[w.id] = w3;
			var robot = self.buildRobot3D();
			view.updateRobot(robot);			
		}
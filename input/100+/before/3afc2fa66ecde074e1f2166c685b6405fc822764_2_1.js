function() {
		
		var update = {};
		var isUpdateNeeded = false;

		var body = this.physicsEngine.world.GetBodyList();
		do {
			var userData = body.GetUserData();

			if(userData && body.IsAwake()){
				update[userData] = {
					p: body.GetPosition(),
					a: body.GetAngle(),
					lv: body.GetLinearVelocity(),
					av: body.GetAngularVelocity()
				};
				isUpdateNeeded = true;
			}
		} while (body = body.GetNext());
		
		if(isUpdateNeeded) {
			NotificationCenter.trigger("sendCommandToAllUsers", ['gameCommand', {worldUpdate:update}]);
		}

		setTimeout(this.updateWorld.bind(this), Settings.WORLD_UPDATE_BROADCAST_INTERVAL);
	}
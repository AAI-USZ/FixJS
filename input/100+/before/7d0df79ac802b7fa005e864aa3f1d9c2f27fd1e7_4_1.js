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
			this.serverGame.updateClientsWorld(update);
		}

		setTimeout(this.updateWorld.bind(this), 15); // FIXME: do this a different hearbeat
	}
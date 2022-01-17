function() {
		var pPos = body.GetPosition(),
			v = body.GetLinearVelocity();
		this.position.X = pPos.X;
		this.position.Y = pPos.Y;
		if(v.x === 0 && v.y === 0) {
			self.stop(0);
		} else {
			if(!self.animated) {
				self.frameLoop(walkcycle, true);
			}
		}
		//this.angle = body.GetAngle();
		$draw();
		//console.log(self.tile);
	}
function() {
		var pPos = body.GetPosition();
		this.position.X = pPos.X;
		this.position.Y = pPos.Y;
		//this.angle = body.GetAngle();
		$draw();
		//console.log(self.tile);
	}
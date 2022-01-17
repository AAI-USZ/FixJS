function() {
		if(self.isGrounded()) {
			var f = new Box2D.Common.Math.b2Vec2(10, 0);			
			body.SetLinearVelocity(f);
			//self.frameLoop(walkcycle, true);		
			self.scale.X = 1.0;
			//self.setTile(3);
		}
		//body.ApplyImpulse(f, body.GetPosition());
	}
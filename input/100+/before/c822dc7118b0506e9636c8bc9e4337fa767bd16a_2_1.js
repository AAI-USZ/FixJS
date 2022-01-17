function() {
		if(self.isGrounded()) {
			var f = new Box2D.Common.Math.b2Vec2(-10, 0);	
			body.SetLinearVelocity(f);
			self.frameLoop(walkcycle, true);
		}		
		//body.ApplyImpulse(f, body.GetPosition());
	}
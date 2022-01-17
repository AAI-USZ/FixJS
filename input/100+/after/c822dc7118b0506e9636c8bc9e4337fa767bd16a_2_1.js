function() {
		//body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0, 0));
		if(self.isGrounded()) {			
			var f = new Box2D.Common.Math.b2Vec2(0, -500),
				v = body.GetLinearVelocity();
			if(v.x < 0) { 
				f.x = -100; 
			} else if(v.x > 0) {
				f.x = 100;
			}
			console.log(f);
			//f.x = v.x * 100;
			body.ApplyImpulse(f, body.GetPosition());
			a2d.resources.jump.play();
		}
	}
function(pos) {
	a2d.Tile.apply(this, [a2d.resources["dino"]]);
	var self = this,
		fixDef = new Box2D.Dynamics.b2FixtureDef,
		bodyDef = new Box2D.Dynamics.b2BodyDef,
		body = null,
		$draw = this.draw.bind(this),
		walkcycle = new a2d.Vector(0, 2);
	//constructor body
	this.position = pos;
	pPos = new Box2D.Common.Math.b2Vec2(0, 0);
	pPos.X = pos.X;
	pPos.Y = pos.Y;
	fixDef.density = 1.0;
	fixDef.friction = 5.0;
	fixDef.restitution = 0.2;	
	bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
	//fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
	//fixDef.shape.SetAsBox(3.0, 3.0);
	fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(3.0);
	bodyDef.position.Set(pPos.x, pPos.y);
	bodyDef.allowSleep = false;
	body = game.world.CreateBody(bodyDef);
	body.CreateFixture(fixDef);

	this.fps = 4;

	this.isGrounded = function() {
		var cl = body.GetContactList();	
		return cl != null;
	};

	this.draw = function() {
		var pPos = body.GetPosition();
		this.position.X = pPos.X;
		this.position.Y = pPos.Y;
		//this.angle = body.GetAngle();
		$draw();
		//console.log(self.tile);
	};

	this.jump = function() {
		//body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0, 0));
		if(self.isGrounded()) {
			var f = new Box2D.Common.Math.b2Vec2(0, -600);	
			body.ApplyImpulse(f, body.GetPosition());
			a2d.resources.jump.play();
		}
	};

	this.left = function() {
		if(self.isGrounded()) {
			var f = new Box2D.Common.Math.b2Vec2(-10, 0);	
			body.SetLinearVelocity(f);
			self.frameLoop(walkcycle, true);
		}		
		//body.ApplyImpulse(f, body.GetPosition());
	};
	this.right = function() {
		if(self.isGrounded()) {
			var f = new Box2D.Common.Math.b2Vec2(10, 0);			
			body.SetLinearVelocity(f);
			self.frameLoop(walkcycle, true);
			//self.setTile(3);
		}
		//body.ApplyImpulse(f, body.GetPosition());
	};
	this.stop = function() {
		if(self.isGrounded()) {
			var f = new Box2D.Common.Math.b2Vec2(0, 0);			
		}
		//body.SetLinearVelocity(f);
	};
}
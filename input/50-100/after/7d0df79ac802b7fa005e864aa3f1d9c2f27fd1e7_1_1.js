function (direction, speed) {
        this.setFriction(Settings.PLAYER_MOTION_FRICTION);
        this.body.SetAwake(true);
        var vector = new Box2D.Common.Math.b2Vec2(speed * direction, this.body.GetLinearVelocity().y);
        this.body.SetLinearVelocity(vector);
    }
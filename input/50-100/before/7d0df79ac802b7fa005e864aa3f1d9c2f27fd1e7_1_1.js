function (direction, speed) {
        this._setFriction(Settings.PLAYER_MOTION_FRICTION);
        this._body.SetAwake(true);
        var vector = new Box2D.Common.Math.b2Vec2(speed * direction, this._body.GetLinearVelocity().y);
        this._body.SetLinearVelocity(vector);
    }
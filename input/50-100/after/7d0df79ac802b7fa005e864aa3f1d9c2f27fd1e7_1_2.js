function () {
        this.body.SetAwake(true);

        var vector = new Box2D.Common.Math.b2Vec2(0, -Settings.JUMP_SPEED);
        this.body.ApplyImpulse(vector, this.body.GetPosition());

        // maybe change to a constant force instead of applying of force?
        // to prevent higher jumping running uphill, etc.
    }
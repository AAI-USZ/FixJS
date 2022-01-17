function () {
        var vector = new Box2D.Common.Math.b2Vec2(0, -0.05);
        this._body.ApplyImpulse(vector, this._body.GetPosition());
    }
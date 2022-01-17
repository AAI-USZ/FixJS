function () {
        var vector = new Box2D.Common.Math.b2Vec2(0, -0.05);
        this.body.ApplyImpulse(vector, this.body.GetPosition());
    }
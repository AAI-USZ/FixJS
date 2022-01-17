function (friction) {
        if(!friction) friction = -1;

        if (this._legs.GetFriction() != friction)
        {
            this._legs.SetFriction(friction);
        }
    }
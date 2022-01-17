function (friction) {
        if(!friction) friction = -1;

        if (this.legs.GetFriction() != friction)
        {
            this.legs.SetFriction(friction);
        }
    }
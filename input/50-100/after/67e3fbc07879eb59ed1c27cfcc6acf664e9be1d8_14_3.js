function()
    {
        this.BaseAnimation = CreateBasicBaseAnimation(frames,name);
        this.isLooping_ = isLooping || false;
        this.internalFrame_ = 0;
        this.direction_  = direction || 0;
        if(!!bgImg)
            this.CreateElement(bgImg);
    }
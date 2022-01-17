function()
    {
        this.frames_ = frames || [];
        this.frameSpeed_ = 4;
        this.name_ = name;
        this.isAttack_ = isAttack == undefined ? true : isAttack;
        this.allowAirBlock_ = allowAirBlock;
        this.lastFrameOffset = 0;
        this.nbFrames_ = 0;
    }
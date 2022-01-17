function(owner,image,nbFrames,x,y)
    {
        if(!!this.frames_.length > 0)
            this.lastFrameOffset_ += this.frames_[this.frames_.length - 1].Frames;

        var frameOffset = this.lastFrameOffset;

        ++owner.nbFrames_;
        this.frames_[this.frames_.length] = CreateFrame(this.frames_.length,owner.GetNextFrameID(),"",image,nbFrames,0,0,x || 0,y || 0,0,0,frameOffset);
        this.nbFrames_ += this.frames_[this.frames_.length - 1].Frames;
    }
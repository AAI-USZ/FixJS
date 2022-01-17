function(frame)
{
    if(!!this.currentAnimation_.Animation && !!this.currentAnimation_.Animation.flags_.Combat && !!(this.currentAnimation_.Animation.flags_.Combat & COMBAT_FLAGS.NO_SLIDE_BACK))
        return this.StopSlide();
    if(!!this.frameFreeze_ && !this.IsBlocking())
        return;
    if(this.t_ >= CONSTANTS.HALF_PI || !this.isSliding_ || !!this.IsBeingGrappled())
    {
        this.StopSlide();
        return;
    }
    this.t_ = Math.min(this.t_ + CONSTANTS.SLIDE_INC, CONSTANTS.HALF_PI);
    this.lastFx_ = this.fx_;
    this.fx_ =  Math.sin(this.t_) * this.slideFactor_;
    ++this.slideCount_;

    if(!!this.showSlideDirt_)
    {
        if(this.slideCount_ % CONSTANTS.DIRT_FREQUENCY == 0)
        {
            this.SpawnSmallDirt(frame);
        }
    }

    var deltaX = (this.lastFx_ - this.fx_);
    
    if(this.y_ == STAGE.FLOORY)
        this.MoveX(deltaX);
    else
        this.slideFactor_ *= 0.5;
    
}
function(frame,attackFlags,hitDelayFactor,energyToAdd,behaviorFlags,otherPlayer)
{
    if(!!(behaviorFlags & BEHAVIOR_FLAGS.THROW))
    {
        if(!this.grappledPlayer_)
            this.grappledPlayer_ = otherPlayer;
        else
        {
            this.HandleGrapple(this.currentAnimation_.FrameIndex-1,frame,0,0);
            this.grappledPlayer_ = null;
            this.grappledPlayerId_ = "";
            hitDelayFactor = 0;
        }
    }
    else
    {
        this.SlideBack(frame,attackFlags,hitDelayFactor,energyToAdd,behaviorFlags,otherPlayer);
    }

    this.ChangeEnergy(energyToAdd);
    this.SetHoldFrame(this.baseGiveHitDelay_ * hitDelayFactor);
}
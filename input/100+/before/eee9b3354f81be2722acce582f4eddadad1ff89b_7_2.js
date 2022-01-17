function(attackFlags,hitDelayFactor,energyToAdd,behaviorFlags,p2)
{
    if(!!(behaviorFlags & BEHAVIOR_FLAGS.THROW))
        this.grappledPlayerId_ = p2.id_;

    this.giveHitFn_ = (function(thisValue,attackFlags,hitDelayFactor,energyToAdd,behaviorFlags,p2)
    {
        return function (frame)
        {
            thisValue.GiveHit(frame,attackFlags,hitDelayFactor,energyToAdd,behaviorFlags,p2);
        }
    })(this,attackFlags,hitDelayFactor,energyToAdd,behaviorFlags,p2);
    this.SetHoldFrame(this.baseGiveHitDelay_ * hitDelayFactor);
}
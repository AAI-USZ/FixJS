function(frame, moveFrame)
{
    this.isInAttackFrame_ = true;
    if(!!(moveFrame.FlagsToSet.Combat & COMBAT_FLAGS.CAN_BE_BLOCKED))
    {
        this.mustClearAllowBlock_ = true;
        this.onStartAttackFn_(this.currentAnimation_.ID);
    }
    if(!!(moveFrame.FlagsToClear.Combat & COMBAT_FLAGS.CAN_BE_BLOCKED))
    {
        this.mustClearAllowBlock_ = false;
        this.onEndAttackFn_(this.currentAnimation_.ID);
    }
    if(!!(moveFrame.FlagsToSet.Combat & COMBAT_FLAGS.CAN_BE_AIR_BLOCKED))
    {
        this.mustClearAllowAirBlock_ = true;
        this.onStartAirAttackFn_(this.currentAnimation_.ID);
    }
    if(!!(moveFrame.FlagsToClear.Combat & COMBAT_FLAGS.CAN_BE_AIR_BLOCKED))
    {
        this.mustClearAllowAirBlock_ = false;
        this.onEndAirAttackFn_(this.currentAnimation_.ID);
    }

    this.attackFn_(moveFrame.HitDelayFactor, moveFrame.HitID,frame,moveFrame.HitPoints,moveFrame.FlagsToSend,moveFrame.AttackState,moveFrame.BaseDamage,this.currentAnimation_.Animation.OverrideFlags,moveFrame.EnergyToAdd,this.currentAnimation_.Animation.BehaviorFlags,this.currentAnimation_.Animation.InvokedAnimationName,moveFrame.FlagsToSet.HitSound,moveFrame.FlagsToSet.BlockSound);
}
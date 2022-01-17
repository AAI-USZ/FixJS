function(move,frame)
{
    distance = move.GrappleDistance;
    airborneFlags = move.GetOtherPlayerAirborneFlags();

    var retVal = false;
    var grappledPlayer = this.GetPhysics().GetGrappledPlayer(this.team_,this.GetAbsFrontX(),this.y_,distance,airborneFlags,this.IsAirborne());
    if(!!grappledPlayer)
    {
        retVal = true;

        var firstFrame = move.GetFrame(0);
        this.SetGiveHit(firstFrame.AttackFlags,firstFrame.HitDelayFactor,firstFrame.EnergyToAdd,move.BehaviorFlags,grappledPlayer);
        grappledPlayer.TakeHit(firstFrame.AttackFlags,HIT_FLAGS.NEAR,firstFrame.FlagsToSend,frame,frame,firstFrame.BaseDamage,firstFrame.EnergyToAdd,false,0,0,this.direction_,this.id_,firstFrame.HitID,move.OverrideFlags,0,0,this,move.BehaviorFlags,move.InvokedAnimationName,firstFrame.FlagsToSet.HitSound,firstFrame.FlagsToSet.BlockSound);
        //this.attackFn_(moveFrame.HitDelayFactor, moveFrame.HitID,frame,moveFrame.HitPoints,moveFrame.FlagsToSend,moveFrame.AttackFlags,moveFrame.BaseDamage,this.currentAnimation_.Animation.OverrideFlags,moveFrame.EnergyToAdd,this.currentAnimation_.Animation.BehaviorFlags,this.currentAnimation_.Animation.InvokedAnimationName,moveFrame.FlagsToSet.HitSound,moveFrame.FlagsToSet.BlockSound);

    }

    return retVal;
}
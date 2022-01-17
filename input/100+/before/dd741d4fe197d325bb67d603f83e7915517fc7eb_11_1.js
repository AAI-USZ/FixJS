function(value,frame)
{
    var keys = value.Keys;

    /*check if the player wants to turn around*/
    if(frame % 10 == 0)
    {
        for(var i = 0; i < keys.length; ++i)
        {
            if(!!(keys[i] & BUTTONS.TURN_AROUND))
            {
                this.TurnAround();
                return;
            }
        }
    }

    var matches = [];
    var retVal = null;
    var priority = -1;
    var currentEnergy = this.getEnergyFn_();
    for(var i in this.moves_)
    {
        var move = this.moves_[i];

        if(!!move.isImplicit_)
            continue;

        if((move.keySequence_.length != keys.length)
            ||(!!move.duration_ && (value.Duration > move.duration_
            ||(!!move.energyToSubtract_ && currentEnergy < move.energyToSubtract_))))
            continue;
        var pstate = (move.requiredFlags_ | POSE_FLAGS.ALLOW_BLOCK | POSE_FLAGS.ALLOW_AIR_BLOCK) ^ (POSE_FLAGS.ALLOW_BLOCK | POSE_FLAGS.ALLOW_AIR_BLOCK);
        var mustAllowBlock = !!(move.requiredFlags_ & POSE_FLAGS.ALLOW_BLOCK);
        var mustAllowAirBlock = !!(move.requiredFlags_ & POSE_FLAGS.ALLOW_AIR_BLOCK);
        if(!pstate || !!(this.flags_.Pose.Has(pstate)))
        {
            
            if(!!mustAllowBlock && !(this.flags_.Pose.Has(POSE_FLAGS.ALLOW_BLOCK)))
                continue;
            if(!!mustAllowAirBlock && !(this.flags_.Pose.Has(POSE_FLAGS.ALLOW_AIR_BLOCK)))
                continue;

            if(!!this.IsProjectileInUse(move))
                continue;

            var cmpValue = this.CompareKeySequence(move,keys);
            if(!cmpValue)
                cmpValue = this.CompareAlternateKeySequences(move,keys);


            if(cmpValue == CONSTANTS.EXACT_MATCH)
            {
                if(!!move.grappleDistance_)
                {
                    if(!!this.registeredHit_.HitID)
                        continue;
                    if(!this.GetPhysics().CanGrapple(this.team_,this.GetAbsFrontX(),this.y_,move.grappleDistance_,move.matchAirborne_ === null ? null : (this.IsAirborne() && move.matchAirborne_)))
                        continue;
                }

                return move;
            }
            else
            {
                if(!!move.grappleDistance_)
                    continue;
            }

            if(cmpValue == 0)
                continue;
            if((cmpValue == CONSTANTS.PRIORITY_MATCH) && move.priority_ > priority)
            {
                priority = move.priority_;
                retVal = move;
            }
        }
    }
    return retVal;
}
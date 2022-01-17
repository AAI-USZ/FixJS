function(attackState,hitState,flags,startFrame,frame,damage,energyToAdd,isProjectile,hitX,hitY,attackDirection,who,hitID,moveOverrideFlags,fx,fy,otherPlayer,behaviorFlags,invokedAnimationName,hitSound,blockSound)
{
    this.freezeUntilFrame_ = 0;
    if(!!otherPlayer)
    {
        otherPlayer.giveHitFn_(frame);
        if(otherPlayer.IsAirborne() && this.IsAirborne())
            fx = 1;
    }
    this.lastHitFrame_[who] = hitID;
    this.lastHit_ = {x:hitX,y:hitY};
    if(!!isProjectile && !!this.currentAnimation_.Animation && !!(this.currentAnimation_.Animation.flags_.Combat & COMBAT_FLAGS.IGNORE_PROJECTILES))
        return false;
    var move = null;
    var slideAmount = 0;
    var hitDelayFactor_ = 1;
    var isSpecial = attackState && ATTACK_FLAGS.SPECIAL || !!isProjectile;

    if(!!(attackState & ATTACK_FLAGS.THROW_START))
    {
        /*can not block throws*/
        this.SetDirection(otherPlayer.direction_ * -1);
        if(this.IsBlocking())
        {
            /*player attempt to block is overriden*/
            this.flags_.Pose.Remove(POSE_FLAGS.ALLOW_BLOCK);
            /*if the player is blocking, then remove it*/
            this.flags_.Player.Remove(PLAYER_FLAGS.BLOCKING);
        }

        this.isBeingThrown_ = true;

        if(!!invokedAnimationName)
        {
            move = this.moves_[invokedAnimationName];
            if(!!move)
            {
                move.controllerAnimation_ = otherPlayer.currentAnimation_;
            }
        }
        this.QueueGrappleSound();
    }
    else if(!!(attackState & ATTACK_FLAGS.HITS_LOW) && this.IsBlockingLow()
        || !!(attackState & ATTACK_FLAGS.HITS_HIGH) && this.IsBlockingHigh()
        || !(attackState & ATTACK_FLAGS.HITS_LOW) && !(attackState & ATTACK_FLAGS.HITS_HIGH) && this.IsBlocking())
    {
        /*allow special moves to do some damage*/
        if(!!isSpecial)
        {
            damage = Math.floor(Math.max(damage * 0.05, 1));
        }
        else
        {
            damage = 0;
            energyToAdd = 0;
        }

        if(!!(attackState & ATTACK_FLAGS.LIGHT)) {slideAmount = CONSTANTS.DEFAULT_CROUCH_LIGHT_HRSLIDE / 2;}
        if(!!(attackState & ATTACK_FLAGS.MEDIUM)) {slideAmount = CONSTANTS.DEFAULT_CROUCH_MEDIUM_HRSLIDE / 2;}
        if(!!(attackState & ATTACK_FLAGS.HARD)) {slideAmount = CONSTANTS.DEFAULT_CROUCH_HARD_HRSLIDE / 2;}
        this.freezeUntilFrame_ = frame + CONSTANTS.DEFAULT_BLOCK_FREEZE_FRAME_COUNT;
    }
    else
    {
        if(this.IsBlocking())
        {
            /*player attempt to block was overriden*/
            this.flags_.Pose.Remove(POSE_FLAGS.ALLOW_BLOCK);
            /*if the player is blocking, then remove it*/
            this.flags_.Player.Remove(PLAYER_FLAGS.BLOCKING);
        }

        if(!!damage)
            this.IncCombo();

        if(!!energyToAdd && !(!!(attackState & ATTACK_FLAGS.THROW_END)))
            energyToAdd = Math.ceil(energyToAdd/2);

        if(this.flags_.Pose.Has(POSE_FLAGS.CROUCHING))
        {
            if(!!(attackState & ATTACK_FLAGS.TRIP)) {move = this.moves_[_c3("_",POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING,"_hr_trip")];}
            if(!!(attackState & ATTACK_FLAGS.LIGHT)) {slideAmount = CONSTANTS.DEFAULT_CROUCH_LIGHT_HRSLIDE; move = this.moves_[_c3("_",POSE_FLAGS.CROUCHING,"_hr_cLN")];}
            if(!!(attackState & ATTACK_FLAGS.MEDIUM)) {slideAmount = CONSTANTS.DEFAULT_CROUCH_MEDIUM_HRSLIDE; move = this.moves_[_c3("_",POSE_FLAGS.CROUCHING,"_hr_cMN")];}
            if(!!(attackState & ATTACK_FLAGS.HARD)) {slideAmount = CONSTANTS.DEFAULT_CROUCH_HARD_HRSLIDE; move = this.moves_[_c3("_",POSE_FLAGS.CROUCHING,"_hr_cHN")];}
        }
        else
        {
            if(!!(attackState & ATTACK_FLAGS.TRIP) && !!(hitState & HIT_FLAGS.NEAR)) {move = this.moves_[_c3("_",POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING,"_hr_trip")];}
            else if(!!(attackState & ATTACK_FLAGS.KNOCKDOWN)) {move = this.moves_[_c3("_",POSE_FLAGS.STANDING,"_hr_knockdown")];}

            else if(!!(attackState & ATTACK_FLAGS.LIGHT) && !!(hitState & HIT_FLAGS.NEAR)) {slideAmount = CONSTANTS.DEFAULT_LIGHT_HRSLIDE; move = this.moves_[_c3("_",POSE_FLAGS.STANDING,"_hr_sLN")];}
            else if(!!(attackState & ATTACK_FLAGS.LIGHT) && !!(hitState & HIT_FLAGS.FAR)) {slideAmount = CONSTANTS.DEFAULT_LIGHT_HRSLIDE; move = this.moves_[_c3("_",POSE_FLAGS.STANDING,"_hr_sLF")];}

            else if(!!(attackState & ATTACK_FLAGS.MEDIUM) && !!(hitState & HIT_FLAGS.NEAR)) {slideAmount = CONSTANTS.DEFAULT_MEDIUM_HRSLIDE; move = this.moves_[_c3("_",POSE_FLAGS.STANDING,"_hr_sMN")];}
            else if(!!(attackState & ATTACK_FLAGS.MEDIUM) && !!(hitState & HIT_FLAGS.FAR)) {slideAmount = CONSTANTS.DEFAULT_MEDIUM_HRSLIDE; move = this.moves_[_c3("_",POSE_FLAGS.STANDING,"_hr_sMF")];}

            else if(!!(attackState & ATTACK_FLAGS.HARD) && !!(hitState & HIT_FLAGS.NEAR)) {slideAmount = CONSTANTS.DEFAULT_HARD_HRSLIDE; move = this.moves_[_c3("_",POSE_FLAGS.STANDING,"_hr_sHN")];}
            else if(!!(attackState & ATTACK_FLAGS.HARD) && !!(hitState & HIT_FLAGS.FAR)) {slideAmount = CONSTANTS.DEFAULT_HARD_HRSLIDE; move = this.moves_[_c3("_",POSE_FLAGS.STANDING,"_hr_sHF")];}
        }
    }

    if(!!move)
    {
        this.SetCurrentAnimation({Animation:move,StartFrame:frame,Direction:this.direction_});
        if(!!(attackState & ATTACK_FLAGS.THROW_START))
        {
            this.currentAnimation_.StartFrame = otherPlayer.currentAnimation_.StartFrame;
            this.ignoreCollisionsWith_ = otherPlayer.id_;
            return;
        }
    }
    /*get the direction of the attack*/
    var relAttackDirection = 0;
    if(!!isProjectile)
        relAttackDirection = this.GetProjectileDirection(attackDirection);
    else
        relAttackDirection = this.GetAttackDirection(attackDirection);


    this.TakeDamage(damage);
    this.ChangeEnergy(energyToAdd);
    if(this.IsDead() && !this.isLosing_)
    {
        if(!!flags)
            this.SpawnHitReportAnimations(frame, flags, hitState, relAttackDirection);
        /*if any player is dead, then the whole team is dead.*/
        this.ForceTeamLose(frame,attackDirection);
        if(!!this.isBeingThrown_)
        {
            this.isBeingThrown_ = false;
            attackDirection = -this.GetRelativeDirection(attackDirection);
            this.Eject(attackState,hitState,flags,frame,damage,isProjectile,hitX,hitY,attackDirection,fx,fy);
        }
        else
        {
            this.KnockDownDefeat(frame,attackDirection);
        }

        this.QueueHitSound(hitSound);
        return;
    }

    if(!!(attackState & ATTACK_FLAGS.THROW_EJECT) && !!this.isBeingThrown_)
    {
        this.isBeingThrown_ = false;
        attackDirection = -this.GetRelativeDirection(attackDirection);
        this.Eject(attackState,hitState,flags,frame,damage,isProjectile,hitX,hitY,attackDirection,fx,fy);
        hitDelayFactor_ = 0;
    }
    else if(this.IsBlocking())
    {
        if(!!flags)
            this.SpawnHitReportAnimations(frame, flags, hitState, relAttackDirection);
        this.StartSlide(frame, slideAmount,attackDirection,fx);
        if(!!isProjectile)
            this.QueueBlockProjectileSound();
        else
            this.QueueBlockSound();
    }
    else if(!!(attackState & ATTACK_FLAGS.TRIP))
    {
        attackDirection = this.GetRelativeDirection(attackDirection);
        if(!!flags)
            this.SpawnHitReportAnimations(frame, flags, hitState, relAttackDirection);
        this.TakeTrip(attackState,hitState,flags,frame,damage,isProjectile,hitX,hitY,attackDirection,fx,fy);
    }
    else if(!!(attackState & ATTACK_FLAGS.FLOOR_AIRBORNE_HARD) && !!this.IsAirborne())
    {
        attackDirection = this.GetRelativeDirection(attackDirection);

        if(!!flags)
            this.SpawnHitReportAnimations(frame, flags, hitState, relAttackDirection);
        this.Eject(attackState,hitState,flags,frame,damage,isProjectile,hitX,hitY,attackDirection,fx,fy);
    }
    else if(!!(attackState & ATTACK_FLAGS.KNOCKDOWN) || (!!(attackState & ATTACK_FLAGS.FLOOR_AIRBORNE) && !!this.IsAirborne()))
    {
        attackDirection = this.GetRelativeDirection(attackDirection);

        if(!!flags)
            this.SpawnHitReportAnimations(frame, flags, hitState, relAttackDirection);
        this.KnockDown(attackState,hitState,flags,frame,damage,isProjectile,hitX,hitY,attackDirection,fx,fy);
    }
    else if(this.IsAirborne())
    {
        attackDirection = this.GetRelativeDirection(attackDirection);
        /*TODO: remove rear hit flags unless it is a special move*/
        if(!!flags)
            this.SpawnHitReportAnimations(frame, flags, hitState, relAttackDirection);
        this.TakeAirborneHit(attackState,hitState,flags,frame,damage,isProjectile,hitX,hitY,attackDirection,fx,fy);
    }
    else if(!(attackState & ATTACK_FLAGS.THROW_START))
    {
        if(!!flags)
            this.SpawnHitReportAnimations(frame, flags, hitState, relAttackDirection);
        this.StartSlide(frame, slideAmount,attackDirection,fx);
    }

    if(!!(attackState & ATTACK_FLAGS.NO_HIT_DELAY))
        hitDelayFactor_ = 0;

    this.SetHoldFrame(this.baseTakeHitDelay_ * hitDelayFactor_);
    if(!this.IsBlocking())
        this.QueueHitSound(hitSound);

    this.registeredHit_.HitID = null;
    return true;
}
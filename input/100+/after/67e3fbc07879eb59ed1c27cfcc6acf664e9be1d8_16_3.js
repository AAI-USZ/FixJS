function(attackFlags,hitState,flags,frame,damage,energyToAdd,isGrapple,isProjectile,hitX,hitY,attackDirection,who,hitID,moveOverrideFlags,otherPlayer,fx,fy,behaviorFlags,invokedAnimationName,hitSound,blockSound)
{
    this.lastHitFrame_[who] = hitID;
    this.registeredHit_.AttackFlags = attackFlags;
    this.registeredHit_.HitState = hitState;
    this.registeredHit_.Flags = flags;
    this.registeredHit_.Frame = frame - 2;
    this.registeredHit_.StartFrame = this.currentAnimation_.StartFrame;
    this.registeredHit_.Damage = damage;
    this.registeredHit_.EnergyToAdd = energyToAdd;
    this.registeredHit_.IsProjectile = isProjectile;
    this.registeredHit_.HitX = hitX;
    this.registeredHit_.HitY = hitY;
    this.registeredHit_.Who = who;
    this.registeredHit_.AttackDirection = attackDirection;
    this.registeredHit_.HitID = hitID;
    this.registeredHit_.MoveOverrideFlags = moveOverrideFlags;
    this.registeredHit_.AttackForceX = fx || 1;
    this.registeredHit_.AttackForceY = fy || 1;
    this.registeredHit_.BehaviorFlags = behaviorFlags;
    this.registeredHit_.InvokedAnimationName = invokedAnimationName;
    this.registeredHit_.HitSound = hitSound || 0;
    this.registeredHit_.BlockSound = blockSound || 0;
    this.registeredHit_.OtherPlayer = otherPlayer;

    if(!!isGrapple)
        this.SetPendingGrapple(true);

    this.GetMatch().RegisterAction(new ActionDetails(this.currentAnimation_.Animation.OverrideFlags,this,who,isProjectile,isGrapple,this.currentAnimation_.StartFrame,frame,otherPlayer));

    if(!!isProjectile && !!this.currentAnimation_.Animation && !!(this.currentAnimation_.Animation.Flags.Combat & COMBAT_FLAGS.IGNORE_PROJECTILES))
        return false;
    return true;
}
function(newAnimation)
{
    ++this.moveCount_;
    if(!!this.currentAnimation_ && this.currentAnimation_.Animation)
    {
        if(!!newAnimation && !!this.currentAnimation_.Animation.chainAnimation_)
        {
            if(!!(this.currentAnimation_.Animation.chainAnimation_.flags_.Player & PLAYER_FLAGS.USE_CURRENT_VX))
                newAnimation.Vx = this.currentAnimation_.Animation.chainAnimation_.chainVxFunc_(this.currentAnimation_.Vx);
            if(!!(this.currentAnimation_.Animation.chainAnimation_.flags_.Player & PLAYER_FLAGS.USE_CURRENT_VY))
                newAnimation.Vy = this.currentAnimation_.Animation.chainAnimation_.chainVyFunc_(this.currentAnimation_.Vy);
        }

        if(!!this.currentAnimation_.Animation.trail_)
            this.currentAnimation_.Animation.trail_.Disable();

        /*it is possible that the player was attacked before clearing the block state*/
        if(!!this.mustClearAllowBlock_)
        {
            this.mustClearAllowBlock_ = false;
            this.onEndAttackFn_(this.currentAnimation_.ID);
        }
        if(!!this.mustClearAllowAirBlock_)
        {
            this.mustClearAllowAirBlock_ = false;
            this.onEndAirAttackFn_(this.currentAnimation_.ID);
        }
        this.lastAnimation_ = this.currentAnimation_.Animation;

        this.currentAnimation_.Animation.controllerAnimation_ = null;
        if(!!(this.currentAnimation_.Animation.ignoresCollisions_))
        {
            if(!(newAnimation.Animation.ignoresCollisions_))
                this.flags_.Player.Remove(PLAYER_FLAGS.IGNORE_COLLISIONS);
            this.fixXFn_(1);
        }
        this.flags_.Pose.Remove(this.currentAnimation_.Animation.flags_.Pose);
    }

    this.currentAnimation_ = newAnimation;
    if(!!newAnimation && !!newAnimation.Animation)
    {
        this.SetPendingGrapple(false);
        if(this.IsExecutingSuperMove())
        {
            this.GetMatch().OnSuperMoveCompleted(this);
            this.SetExecutingSuperMove(false);
        }
        if(!!newAnimation.Animation.isSuperMove_)
        {
            this.SetZOrder(20);
            this.GetMatch().OnSuperMoveStarted(this);
            this.QueueSuperMoveChargeSound();
            this.SetExecutingSuperMove(true);
        }


        /*must start a move on the ground to hold airborne*/
        if(this.IsAirborne())
            this.canHoldAirborne_ = false;
        else
            this.canHoldAirborne_ = true;

        if(this.currentAnimation_.Vx === undefined)
            this.currentAnimation_.Vx = this.currentAnimation_.Animation.vx_;
        if(this.currentAnimation_.Vy === undefined)
            this.currentAnimation_.Vy = this.currentAnimation_.Animation.vy_;

        this.canInterrupt_ = false;
        this.ClearVxFn();
        this.ClearVyFn();
        this.currentAnimation_.ID = _c3(this.id_,this.currentAnimation_.Animation.baseAnimation_.name_,this.GetGame().GetCurrentFrame());
        this.currentAnimation_.FrameIndex = 0;
        this.ignoreHoldFrame_ = false;
        this.ignoreCollisionsWith_ = "";
        this.flags_.Pose.Add(newAnimation.Animation.flags_.Pose);
        this.adjustShadowPosition_ = newAnimation.Animation.adjustShadowPosition_;
        if(!(newAnimation.Animation.flags_.Player & PLAYER_FLAGS.HOLD_ZINDEX))
            this.MoveToFront();

        this.OffsetImageX(0);
        this.OffsetImageY(0);


        if(!!newAnimation.Animation.energyToSubtract_)
            this.ChangeEnergy(-newAnimation.Animation.energyToSubtract_);
        else if(!!newAnimation.Animation.energyToAdd_)
            this.ChangeEnergy(newAnimation.Animation.energyToAdd_);

        if(!!newAnimation.Animation.trail_)
            this.currentAnimation_.Animation.trail_.Enable(newAnimation.StartFrame,this.element_);
        this.ShowFirstAnimationFrame();
    }
}
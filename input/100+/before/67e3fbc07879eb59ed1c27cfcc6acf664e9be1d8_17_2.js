function(frame,stageX,stageY)
{
    this.CheckDirection();
    if(this.isSliding_)
        this.Slide(frame);

    this.HandleProjectiles(frame,stageX,stageY);
    this.OtherAnimationFrameMove(frame, stageX, stageY);

    if(!!this.IsBeingGrappled())
        return;

    if(!!this.frameFreeze_)
        this.HoldFrame(frame);

    if(!!this.currentAnimation_ && !!this.currentAnimation_.Animation)
    {
        var delta = frame - this.currentAnimation_.StartFrame;
        var currentFrame = this.currentAnimation_.Animation.GetFrame(delta);
        if(!!currentFrame || (!!this.currentFrame_ && (!!(this.currentFrame_.FlagsToSet.Player & PLAYER_FLAGS.HOLD_FRAME))))
        {
            /*check to see if the move allows you to change direction mid-move*/
            if(!!this.mustChangeDirection_ && !!(this.currentAnimation_.Animation.Flags.Player & PLAYER_FLAGS.ALLOW_CHANGE_DIRECTION))
            {
                this.ChangeDirection();
                return;
            }

            /*check to see if the new frame needs to be airborne*/
            if((!!currentFrame && (!!(currentFrame.FlagsToSet.Pose & POSE_FLAGS.AIRBORNE) || !!(currentFrame.FlagsToSet.Pose & POSE_FLAGS.AIRBORNE_FB))))
            {
                if(!this.IsAirborne())
                {
                    var direction = 1;
                    if(!!(currentFrame.FlagsToSet.Player & PLAYER_FLAGS.USE_ATTACK_DIRECTION))
                        direction = this.currentAnimation_.AttackDirection;
                    //this.PerformJump(direction * this.currentAnimation_.Animation.Vx,this.currentAnimation_.Animation.Vy,this.currentAnimation_.Animation.GetXModifier(),this.currentAnimation_.Animation.GetYModifier());
                    this.PerformJump(direction * this.currentAnimation_.Vx,this.currentAnimation_.Vy,this.currentAnimation_.Animation.GetXModifier(),this.currentAnimation_.Animation.GetYModifier());
                }
                else
                {
                    this.SetVxFn(this.currentAnimation_.Animation.GetAirXModifier());
                    this.SetVyFn(this.currentAnimation_.Animation.GetAirYModifier());
                }
            }
            if(!this.frameFreeze_)
            {
                /*if the player is still airborne then apply next step*/
                if(this.IsAirborne())
                {
                    if(this.IsBlocking())
                    {
                        this.Flags.Player.Remove(PLAYER_FLAGS.MOBILE);
                        this.ForceHoldFrame(frame);
                    }
                    if(!this.AdvanceJump() && !this.currentAnimation_.Animation.IsThrow)
                    {
                        this.TryChainAnimation(frame);
                        return;
                    }
                }
            }
            /*some moves (crouch) require frame to not change, this simulates that.*/
            if(!!this.currentFrame_ && !!(this.currentFrame_.FlagsToSet.Player & PLAYER_FLAGS.HOLD_FRAME) && !this.ignoreHoldFrame_)
            {
                /*get the key that must be pressed*/
                var key = this.currentAnimation_.Animation.GetKey(this.currentAnimation_.Animation.GetKeySequenceLength() - 1);
                /*if the key is NOT pressed, then offset into the next frame in the current move*/
                if(!this.IsKeyDown(key))
                {
                    this.HoldFrame(frame);
                    /*must clear frame because the current frame has a HOLD_FRAME flag*/
                    this.SetCurrentFrame(null,frame);
                }
            }
            else if(!!currentFrame && !!(currentFrame.FlagsToSet.Player & PLAYER_FLAGS.MUST_HOLD_KEY)) /*Does the move require the key to be held? ... */
            {
                /*the last key in the keySequence must be the required key*/
                var key = this.currentAnimation_.Animation.GetKey(this.currentAnimation_.Animation.GetKeySequenceLength() - 1);
                if(this.IsKeyDown(key)) /*... and was the key pressed?*/
                {
                    this.SetCurrentFrame(currentFrame,frame,stageX,stageY);
                }
                else
                {
                    /*the required key is not pressed, look for a new move*/
                    this.TryChainAnimation(frame,stageX,stageY);
                }
            }
            else if(!currentFrame)
            {
                this.TryChainAnimation(frame,stageX,stageY);
            }
            else
            {
                if(!this.currentFrame_ || (currentFrame.ID != this.currentFrame_.ID))
                {
                    this.SetCurrentFrame(currentFrame,frame,stageX,stageY);
                }
            }
        }
        else
        {
            /*No more frames for the move.*/
            this.TryChainAnimation(frame);
        }
    }
    else
    {
        this.TryChainAnimation(frame);
    }

    this.checkedForAnimation_ = false;
    this.CleanUpKeyStateChanges(frame);
    /*this.DebugShowKeys();*/
}
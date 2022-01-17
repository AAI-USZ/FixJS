function(newFrame,frame,stageX,stageY,ignoreTranslation)
{
    if(!!this.currentFrame_)
    {
        if(!!newFrame && (newFrame.ID == this.currentFrame_.ID))
            return;

        /*must remove the yOffset each frame*/
        if(this.Flags.Player.Has(PLAYER_FLAGS.SMALLER_AABB))
        {
            this.yBottomOffset_ = 0;
            this.yTopOffset_ = 0;
        }
        /*Remove the flags that were set by the current frame*/
        /*Except for the ones that must be cleared at a later time.*/

        this.Flags.Player.Remove((this.currentFrame_.FlagsToSet.Player
                    | PLAYER_FLAGS.MOBILE)
                    ^ PLAYER_FLAGS.MOBILE);

        this.Flags.Pose.Remove((this.currentFrame_.FlagsToSet.Pose
                    | POSE_FLAGS.AIRBORNE
                    | POSE_FLAGS.AIRBORNE_FB)
                    ^ POSE_FLAGS.AIRBORNE
                    ^ POSE_FLAGS.AIRBORNE_FB);


        this.Flags.Combat.Remove((this.currentFrame_.FlagsToSet.Combat
                    | COMBAT_FLAGS.PROJECTILE_ACTIVE
                    | COMBAT_FLAGS.CAN_BE_BLOCKED
                    | COMBAT_FLAGS.CAN_BE_AIR_BLOCKED)
                    ^ COMBAT_FLAGS.PROJECTILE_ACTIVE
                    ^ COMBAT_FLAGS.CAN_BE_BLOCKED
                    ^ COMBAT_FLAGS.CAN_BE_AIR_BLOCKED);


        this.Flags.SwingSound.Remove(this.currentFrame_.FlagsToSet.SwingSound);
        this.Flags.HitSound.Remove(this.currentFrame_.FlagsToSet.HitSound);
        this.Flags.BlockSound.Remove(this.currentFrame_.FlagsToSet.BlockSound);
        
    }

    var isNewFrame = false;
    
    if(!!newFrame && !!this.currentFrame_ && newFrame.ID != this.currentFrame_.ID)
    {
        if(!!newFrame.LeftSrc && !!this.currentFrame_.LeftSrc && spriteLookup_.GetLeft(newFrame.LeftSrc) != spriteLookup_.GetLeft(this.currentFrame_.LeftSrc))
        {
            isNewFrame = true;
        }
    }
    var isNewSound = !!newFrame
                && ((!!newFrame.soundFilename_ && ((!this.currentFrame_) || (!!this.currentFrame_ && (this.currentFrame_.soundFilename_ != newFrame.soundFilename_))))
                || !!newFrame.FlagsToSet.SwingSound);


    this.currentFrame_ = newFrame;
    if(!!newFrame)
    {
        /*used to force the other player to change frames during a throw*/
        if(!!isNewFrame)
            ++this.currentAnimation_.FrameIndex;

        if(!!(newFrame.FlagsToClear.Combat & COMBAT_FLAGS.SUPER_MOVE_PAUSE))
        {
            this.GetMatch().OnSuperMoveCompleted(this);
            this.SetExecutingSuperMove(false);
        }
        /*if the new frame spawns a projectile, handle that here*/
        if(!this.Flags.Combat.Has(COMBAT_FLAGS.PROJECTILE_ACTIVE) && !!(newFrame.FlagsToSet.Combat & COMBAT_FLAGS.SPAWN_PROJECTILE))
            this.projectiles_[newFrame.chainProjectile_].Throw(frame,stageX,stageY);
        if(!!this.isSliding_ && !!(newFrame.FlagsToSet.Combat & COMBAT_FLAGS.STOP_SLIDE_BACK))
            this.StopSlide();
        if(!!(newFrame.FlagsToSet.Player & PLAYER_FLAGS.RESET_Y_FUNC))
            this.ResetVyFn();
        if(!!(newFrame.FlagsToSet.Player & PLAYER_FLAGS.RESET_X_FUNC))
            this.ResetVxFn();
        if(!!(newFrame.FlagsToSet.Spawn & SPAWN_FLAGS.SPAWN_BIGDIRT))
            this.ShowBigDirt(frame);
        /*StartSlide will show the dirt animations, but we set the amount to 0 so the player itself does not move.*/
        else if(!!(newFrame.FlagsToSet.Spawn & SPAWN_FLAGS.SPAWN_SMALLDIRT))
            this.ShowSmallDirt(frame);

        if(!!(newFrame.FlagsToSet.Player & PLAYER_FLAGS.MOVE_TO_BACK) || !!(newFrame.FlagsToSet.Player & PLAYER_FLAGS.BLOCKING))
            this.MoveToBack();
        if(!!(newFrame.FlagsToSet.Player & PLAYER_FLAGS.MOVE_TO_FRONT))
            this.MoveToFront();

        ignoredFlags = POSE_FLAGS.AIRBORNE | POSE_FLAGS.AIRBORNE_FB; /*flags to be set in the OnFrame function*/
        this.Flags.Pose.Add((newFrame.FlagsToSet.Pose | ignoredFlags) ^ ignoredFlags);
        this.Flags.Combat.Add(newFrame.FlagsToSet.Combat);
        this.Flags.Player.Add(newFrame.FlagsToSet.Player);
        this.Flags.Spawn.Add(newFrame.FlagsToSet.Spawn);

        //this.Flags.MotionSound.Add(newFrame.FlagsToSet.MotionSound);
        //this.Flags.SwingSound.Add(newFrame.FlagsToSet.SwingSound);
        //this.Flags.HitSound.Add(newFrame.FlagsToSet.HitSound);
        //this.Flags.BlockSound.Add(newFrame.FlagsToSet.BlockSound);


        if(!!this.canHoldAirborne_ && (!!(newFrame.FlagsToClear.Pose & POSE_FLAGS.AIRBORNE) || !!(newFrame.FlagsToClear.Pose & POSE_FLAGS.AIRBORNE_FB)))
            this.StopJump();

        this.Flags.Pose.Remove(newFrame.FlagsToClear.Pose);
        this.Flags.Combat.Remove(newFrame.FlagsToClear.Combat);
        this.Flags.Player.Remove(newFrame.FlagsToClear.Player);
        this.Flags.Spawn.Remove(newFrame.FlagsToClear.Spawn);

        if(!!(newFrame.FlagsToSet.Player & PLAYER_FLAGS.SMALLER_AABB))
        {
            var offsetData = this.currentAnimation_.Animation.UserData;
            if(!!offsetData)
            {
                this.yBottomOffset_ = offsetData.bottomOffset || 0;
                this.yTopOffset_ = offsetData.topOffset || 0;
            }
        }

        if(!ignoreTranslation)
        {
            if(!!newFrame.X)
                this.MoveX(newFrame.X);
            if(!!newFrame.Y)
                this.MoveY(newFrame.Y);
        }

        /*this must run before SetSprite*/
        if((!!newFrame.soundFilename_ || !!newFrame.FlagsToSet.SwingSound) && !!isNewSound)
        {
            this.QueueSwingSound(newFrame.FlagsToSet.SwingSound);
            if(!!newFrame.soundFilename_)
                this.QueueSound(newFrame.soundFilename_,newFrame.soundVolume_);
        }
    }
}
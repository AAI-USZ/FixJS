function(player,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,chainProjectile,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitDelayFactor,energyToAdd)
    {
        if(!!this.frames_.length > 0)
            this.lastFrameOffset += this.frames_[this.frames_.length - 1].Frames;
        var frameOffset = this.lastFrameOffset;
        //for(var i = 0; i < this.frames_.length; ++i)
        //    frameOffset += this.frames_[i].Frames;


        if(shadowImage == "" && !!player)
            shadowImage = player.defaultShadowImageSrc_;
        ++player.nbFrames_;
        this.frames_[this.frames_.length] = CreateFrame(this.frames_.length,player.GetNextFrameID(),shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,frameOffset,chainProjectile,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitDelayFactor,energyToAdd);

        var currentFrame = this.frames_[this.frames_.length-1];

        if(!!isThrow_)
        {
            currentFrame.FlagsToSet.Player = (currentFrame.FlagsToSet.Player || MISC_FLAGS.NONE) | PLAYER_FLAGS.INVULNERABLE;
        }

        if(!!this.isAttack_)
        {

            /*Moves that can be air blocked (jump attacks), can ALSO be blocked on the ground, but not in the crouch*/
            var flags = MISC_FLAGS.NONE;
            if(!!this.allowAirBlock_)
                flags = COMBAT_FLAGS.CAN_BE_AIR_BLOCKED;
            else
                flags = COMBAT_FLAGS.CAN_BE_BLOCKED;


            if(!this.skipFrameBlockCheck_)
            {
                currentFrame.FlagsToSet.Combat = (currentFrame.FlagsToSet.Combat || MISC_FLAGS.NONE) | flags;
            }
            else if(!!this.canAddStopBlock_)
            {
                this.canAddStopBlock_ = null;
                currentFrame.FlagsToClear.Combat = (currentFrame.FlagsToClear.Combat || MISC_FLAGS.NONE) | flags;
            }
        }
    }
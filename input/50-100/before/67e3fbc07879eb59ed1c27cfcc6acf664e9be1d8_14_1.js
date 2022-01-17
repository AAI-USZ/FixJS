function(player,volume,soundFilename,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,chainProjectile,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitDelayFactor,energytoAdd)
    {
        this.IgnoresCollisions = !!flagsToSet && !!(flagsToSet.Player & PLAYER_FLAGS.IGNORE_COLLISIONS);
        return this.BaseAnimation.AddFrameWithSound.apply(this.BaseAnimation,arguments);
    }
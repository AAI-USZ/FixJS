function(index,id,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,frameOffset,chainProjectile,imageOffsetX,imageOffsetY,attackFlags,hitPoints,flagsToSend,hitID,hitDelayFactor,energyToAdd)
{
    var Frame = function()
    {
        this.EnergyToAdd = energyToAdd || 0;
        this.Index = index;
        this.ID = +id; /* the "+" is a fast conversion to numeric*/
        this.ImageID = this.ID;
        this.HitID = hitID || 0;
        this.HitDelayFactor = hitDelayFactor || 1;
        this.ShadowImageSrc = !!shadowImage ? "images/misc/misc/shadow-" + shadowImage + ".png" : null;
        this.RightSrc = !!image ? image.replace("#-","l-").replace("x-","r-") : "";
        this.LeftSrc =  !!image ? image.replace("#-","r-").replace("x-","l-") : "";
        this.AttackFlags = attackFlags || 0;
        this.HitPoints = hitPoints || [];

        this.RightSrc = this.RightSrc.replace("|","");
        this.LeftSrc  = this.LeftSrc.replace("|","");

        this.Frames = nbFrames || 0;
        this.FrameOffset = frameOffset || 0;

        this.FlagsToSet = new FrameFlags();
        this.FlagsToSet.Player = !!flagsToSet ? (flagsToSet.Player || 0) : 0;
        this.FlagsToSet.Pose = !!flagsToSet ? (flagsToSet.Pose || 0) : 0;
        this.FlagsToSet.Combat = !!flagsToSet ? (flagsToSet.Combat || 0) : 0;
        this.FlagsToSet.Spawn = !!flagsToSet ? (flagsToSet.Spawn || 0) : 0;
        this.FlagsToSet.MotionSound = !!flagsToSet ? (flagsToSet.MotionSound || 0) : 0;
        this.FlagsToSet.SwingSound = !!flagsToSet ? (flagsToSet.SwingSound || 0) : 0;
        this.FlagsToSet.HitSound = !!flagsToSet ? (flagsToSet.HitSound || 0) : 0;
        this.FlagsToSet.BlockSound = !!flagsToSet ? (flagsToSet.BlockSound || 0) : 0;

        this.FlagsToClear = new FrameFlags();
        this.FlagsToClear.Player = !!flagsToClear ? (flagsToClear.Player || 0) : 0;
        this.FlagsToClear.Pose = !!flagsToClear ? (flagsToClear.Pose || 0) : 0;
        this.FlagsToClear.Combat = !!flagsToClear ? (flagsToClear.Combat || 0) : 0;
        this.FlagsToClear.Spawn = !!flagsToClear ? (flagsToClear.Spawn || 0) : 0;
        this.FlagsToClear.SwingSound = !!flagsToClear ? (flagsToClear.SwingSound || 0) : 0;
        this.FlagsToClear.HitSound = !!flagsToClear ? (flagsToClear.HitSound || 0) : 0;
        this.FlagsToClear.BlockSound = !!flagsToClear ? (flagsToClear.BlockSound || 0) : 0;

        this.FlagsToSend = flagsToSend || MISC_FLAGS.NONE;
    
        this.Priority = priority || 0;
        this.BaseDamage = baseDamage || 0;
        this.X = x || 0;
        this.Y = y || 0;
        this.ImageOffsetX = imageOffsetX === 0 ? 0 : (imageOffsetX || null);
        this.ImageOffsetY = imageOffsetY === 0 ? 0 : (imageOffsetY || null);
        this.chainProjectile_ = chainProjectile;
        this.soundFilename_ = "";
        this.soundVolume_ = 1;

    }
    Frame.prototype.GetEndFrameOffset = function() { return this.Frames + this.FrameOffset; }
    Frame.prototype.GetImageSrc = function(direction){if(direction > 0) { return this.RightSrc; } else { return this.LeftSrc; } }
    return new Frame();
}
function(requiredFlags,name,duration,frames,keySequence,flags,priority,energyToAdd,isAttack,allowAirBlock,behaviorFlags,invokedAnimationName)
{

    var Animation = function()
    {
        this.BaseAnimation = CreateBaseAnimation(frames,name,isAttack,allowAirBlock);
        this.KeySequence = keySequence;
        this.AlternateKeySequences = [];
        this.AdjustShadowPosition = true;
        this.Duration = duration || 0;
        this.ChainAnimation = null;
        this.ChainAnimationFrame = 0;
        this.GrappleDistance = 0;
        this.IsImplicit = false;
        this.Priority = priority || 100;
        this.Vx = 0;
        this.Vy = 0;
        this.ChainVxFunc = function(x) { return x; };
        this.ChainVyFunc = function(y) { return y; };
        this.VyFn = function(a) {return function(b) {return b}};
        this.VxFn = function(a) {return function(b) {return b}};
        this.VyAirFn = function(a) {return function(b) {return b}};
        this.VxAirFn = function(a) {return function(b) {return b}};
        this.EnergyToAdd = energyToAdd || 0;
        this.EnergyToSubtract = 0;
        this.InvokedAnimationName = invokedAnimationName || "";
        this.ControllerAnimation = null;
        this.Trail = null;
        this.AllowJuggle = false;
        this.IgnoresCollisions = false;
        this.OtherPlayerAirborneFlags;
        this.IsThrow = false;
        this.IsSuperMove = false;
        this.IsSpecialMove = false;

        this.Flags = {};
        this.RequiredFlags = requiredFlags;
        this.BehaviorFlags = behaviorFlags || 0;
        this.OverrideFlags = new MoveOverrideFlags();

        this.VyAirFnArgs = {};
        this.VxAirFnArgs = {};
        this.VxFnArgs = {};
        this.VyFnArgs = {};

        this.UserData = null;
    }

    Animation.prototype.GetAlternateKeySequencesLength = function() { return this.AlternateKeySequences.length; }
    Animation.prototype.GetAlternateKeySequenceLength = function(i) { return this.AlternateKeySequences[i].length; }
    Animation.prototype.GetAlternateKeySequence = function(i,j) { return this.AlternateKeySequences[i][j]; }
    Animation.prototype.SetAlternateKeySequence = function(i,value) { return this.AlternateKeySequences[i] = value; }
    Animation.prototype.GetKeySequenceLength = function() { return this.KeySequence.length; }
    Animation.prototype.GetKey = function(index) { return this.KeySequence[index]; }

    Animation.prototype.GetXModifier = function() { return this.XModifier(this.VxFnArgs); }
    Animation.prototype.GetYModifier = function() { return this.YModifier(this.VyFnArgs); }
    Animation.prototype.GetAirYModifier = function() { return this.AirYModifier(this.VyAirFnArgs); }
    Animation.prototype.GetAirXModifier = function() { return this.AirXModifier(this.VxAirFnArgs); }
    Animation.prototype.XModifier = function(args) { return this.VxFn(args); }
    Animation.prototype.YModifier = function(args) { return this.VyFn(args); }
    Animation.prototype.AirYModifier = function(args) { return this.VyAirFn(args); }
    Animation.prototype.AirXModifier = function(args) { return this.VxAirFn(args); }
    Animation.prototype.SetOtherPlayerAirborneFlags = function(flags) { this.OtherPlayerAirborneFlags = flags; }
    Animation.prototype.GetOtherPlayerAirborneFlags = function() { return this.OtherPlayerAirborneFlags; }
    Animation.prototype.IsAttack = function() { return this.BaseAnimation.isAttack_; }

    Animation.prototype.EndBlock = function()
    {
        this.BaseAnimation.skipFrameBlockCheck_ = true;
        this.BaseAnimation.canAddStopBlock_ = true;
    }

    Animation.prototype.AddAlternateKeySequence = function(sequence)
    {
        this.AlternateKeySequences[this.AlternateKeySequences.length] = sequence;
    }

    Animation.prototype.Chain = function(move,frameOffset)
    {
        this.ChainAnimation = (move);
        this.ChainAnimationFrame = (frameOffset || 0);
    }

    Animation.prototype.AddFrameWithSound = function(player,volume,soundFilename,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,chainProjectile,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitDelayFactor,energytoAdd)
    {
        this.IgnoresCollisions = !!flagsToSet && !!(flagsToSet.Player & PLAYER_FLAGS.IGNORE_COLLISIONS);
        return this.BaseAnimation.AddFrameWithSound.apply(this.BaseAnimation,arguments);
    }

    Animation.prototype.AddFrame = function(player,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,chainProjectile,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitDelayFactor,energytoAdd)
    {
        this.IgnoresCollisions = !!flagsToSet && !!(flagsToSet.Player & PLAYER_FLAGS.IGNORE_COLLISIONS);
        return this.BaseAnimation.AddFrame.apply(this.BaseAnimation,arguments);
    }
    Animation.prototype.AddRepeatingFrameWithSound = function(player,volume,soundFilename,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitDelayFactor,energytoAdd)
    {
        this.IgnoresCollisions = !!flagsToSet && !!(flagsToSet.Player & PLAYER_FLAGS.IGNORE_COLLISIONS);
        return this.BaseAnimation.AddRepeatingFrameWithSound.apply(this.BaseAnimation,arguments);
    }
    Animation.prototype.AddRepeatingFrame = function(player,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitDelayFactor,energytoAdd)
    {
        this.IgnoresCollisions = !!flagsToSet && !!(flagsToSet.Player & PLAYER_FLAGS.IGNORE_COLLISIONS);
        return this.BaseAnimation.AddRepeatingFrame.apply(this.BaseAnimation,arguments);
    }
    Animation.prototype.GetNextFrameOffset = function(id) { return this.BaseAnimation.GetNextFrameOffset.apply(this.BaseAnimation,arguments); }
    Animation.prototype.GetFrame = function(frameDelta)
    {
        if(!!this.ControllerAnimation && !!this.ControllerAnimation.Animation)
        {
            var index = this.ControllerAnimation.FrameIndex-1;
            if(index > -1)
                return this.BaseAnimation.frames_[index];
        }
        else
            return this.BaseAnimation.GetFrame.apply(this.BaseAnimation,arguments);

        return null;
    }
    Animation.prototype.GetFrameIndex  = function(id) { return this.BaseAnimation.GetFrameIndex(id); }
    Animation.prototype.SetGrappleDistance = function(x)
    {
        this.GrappleDistance = x;
        this.BehaviorFlags = BEHAVIOR_FLAGS.THROW;
        this.IsThrow = true;
    }
    Animation.prototype.AddUserDataToFrame = function(index,data)
    {
        var frame = this.BaseAnimation.frames_[index];
        frame.UserData[frame.UserData.length] = data;
    }
    Animation.prototype.ClearAllFrameUserData = function()
    {
        for(var i = 0, length = this.BaseAnimation.frames_.length; i < length; ++i)
            this.BaseAnimation.frames_[i].UserData = [];
    }

    Animation.prototype.SetMediumAttack = function()
    {
        this.EnergyToAdd = (2);
    }

    Animation.prototype.SetHardAttack = function()
    {
        this.EnergyToAdd = (3);
    }

    return new Animation();
}
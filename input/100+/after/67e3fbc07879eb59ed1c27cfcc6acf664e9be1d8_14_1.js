function()
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
        this.Animations = [];
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
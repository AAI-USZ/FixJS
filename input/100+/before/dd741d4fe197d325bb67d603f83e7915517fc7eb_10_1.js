function(requiredFlags,name,duration,frames,keySequence,flags,priority,energyToAdd,isAttack,allowAirBlock,behaviorFlags,invokedAnimationName)
{
    this.baseAnimation_ = new BaseAnimation(frames,name,isAttack,allowAirBlock);
    this.keySequence_ = keySequence;
    this.alternateKeySequences_ = [];
    this.adjustShadowPosition_ = true;
    this.state_ = flags || 0;
    this.flags_ = {};
    this.poseState_ = 0;
    this.requiredFlags_ = requiredFlags;
    this.behaviorFlags_ = behaviorFlags || 0;
    this.duration_ = duration || 0;
    //jump to another move after this one is done
    this.chainAnimation_ = null;
    //jump to a specific frame in the chained move
    this.chainAnimationFrame_ = 0;
    this.grappleDistance_ = 0;
    this.isImplicit_ = false;
    this.priority_ = priority || 100;
    this.moveOverrideFlags_ = new MoveOverrideFlags();
    this.vx_ = 0;
    this.vy_ = 0;
    this.chainVxFunc_ = function(x) { return x; };
    this.chainVyFunc_ = function(y) { return y; };

    this.vyFn_ = function(a) {return function(b) {return b}};
    this.vyAirFn_ = function(a) {return function(b) {return b}};
    this.vxFn_ = function(a) {return function(b) {return b}};
    this.vxAirFn_ = function(a) {return function(b) {return b}};

    this.vyAirFnArgs_ = {};
    this.vxFnArgs_ = {};
    this.vxAirFnArgs_ = {};
    this.vyFnArgs_ = {};

    this.userData_ = null;
    this.energyToAdd_ = energyToAdd || 0;
    this.energyToSubtract_ = 0;
    this.invokedAnimationName_ = invokedAnimationName || "";
    this.controllerAnimation_ = null;
    this.controlledAnimation_ = null;
    this.trail_ = null;
    this.allowJuggle_ = false;
    this.ignoresCollisions_ = false;
    this.isThrow_ = false;
    this.isSuperMove_ = false;
    this.isSpecialMove_ = false;
    /*when set to true, for this animation to be performed while airborne, the other player must also be airborne*/
    this.matchAirborne_ = null;
}
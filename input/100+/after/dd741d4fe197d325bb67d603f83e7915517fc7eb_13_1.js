function (name,width,user,nameImageSrc,portriatImageSrc,slideFactor)
{
    this.name_ = name;
    this.nameImageSrc_ = nameImageSrc || "images/misc/misc/" + name.toLowerCase() +"-name-1.png";
    this.portriatImageSrc_ = portriatImageSrc || "images/misc/misc/" + name.toLowerCase() + "-x-portriat-1.png";

    /*these 2 are used so we can easily swap left and right when the player changes directions*/
    this.leftKey_ = user.Left;
    this.rightKey_ = user.Right;
    /*store all of the key mappings*/
    this.buttons_ = {};
    this.buttons_[user.Left] =   {Ascii:user.Left,Bit:1};
    this.buttons_[user.Right] =  {Ascii:user.Right,Bit:2};
    this.buttons_[user.Up] =   {Ascii:user.Up,Bit:4};
    this.buttons_[user.Down] = {Ascii:user.Down,Bit:8};
    this.buttons_[user.P1] =     {Ascii:user.P1,Bit:16};
    this.buttons_[user.P2] =     {Ascii:user.P2,Bit:32};
    this.buttons_[user.P3] =     {Ascii:user.P3,Bit:64};
    this.buttons_[user.K1] =     {Ascii:user.K1,Bit:128};
    this.buttons_[user.K2] =     {Ascii:user.K2,Bit:256};
    this.buttons_[user.K3] =     {Ascii:user.K3,Bit:512};
    this.buttons_[user.Turn] =   {Ascii:user.Turn,Bit:1024};


    this.moves_ = {};
    this.jumpAnimation_ = {};

    this.otherAnimations_ = {};
    this.otherAnimations_.Dirt = [];
    this.otherAnimations_.BigDirt = [];
    this.frontHitReport_ = [];
    this.rearHitReport_ = [];
    this.dirtIndices_ = [];
    this.bigDirtIndices_ = [];
    
    this.frontHitReportImages_ = []
    this.rearHitReportImages_ = []
    
    this.currentAnimation_ = null;
    this.currentFrame_ = null;


    this.element_ = null;
    this.image_ = null;
    this.spriteElement_ = null;
    this.shadowContainer_ = null;
    this.shadow_ = null;

    this.moveStageXFn_ = null;
    this.moveOtherPlayersToBackFn_ = null;
    this.moveOtherPlayersToFrontFn_ = null;
    this.moveXFn_ = null;
    this.moveYFn_ = null;
    this.takeDamageFn_ = null;
    this.changeEnergyFn_ = null;
    this.attackFn_ = null;
    this.projectileAttackFn_ = null;
    this.getHealthFn_ = null;
    this.getEnergyFn_ = null;
    this.onStartAttackFn_ = null;
    this.onEndAttackFn_ = null;
    this.onStartAirAttackFn_ = null;
    this.onEndAirAttackFn_ = null;
    this.onProjectileMovedFn_ = null;
    this.onProjectileGoneFn_ = null;
    this.onIncComboFn_ = null;
    this.onIncComboRefCountFn_ = null;
    this.onDecComboRefCountFn_ = null;
    this.getCurrentComboCountFn_ = null;

    this._showCurrentFrameImageHelperParams = 
    {
        ImageOffsetX:0
        ,ImageOffsetY:0
        ,HasOffsetX:false
        ,HasOffsetY:false
    }


    this.nbFrames_ = 0;
    this.projectiles_ = [];
    this.width_ = width;
    this.halfWidth_ = width/2;
    this.circle_ = new Circle(this.halfWidth_,this.halfWidth_,this.halfWidth_);
    this.headOffsetX_ = 40;
    this.headOffsetY_ = 10;
    this.ai_ = new CreateAIProxy(this);
    this.hasPendingGrapple_ = false;
    /**/
    this.slideFactor_ = slideFactor || 30;
    this.baseTakeHitDelay_ = CONSTANTS.DEFAULT_TAKE_HIT_DELAY;
    this.baseGiveHitDelay_ = CONSTANTS.DEFAULT_GIVE_HIT_DELAY;
    this.index_ = 0;
    this.id_ = "";
    this.team_ = 0;
    this.defaultShadowImageSrc_ = "images/misc/misc/shadow.png";
    this.winAnimationNames_ = [];
    this.InitSounds();
    this.CreateElement();
    this.Reset();
    this.AddGenericAnimations();
}
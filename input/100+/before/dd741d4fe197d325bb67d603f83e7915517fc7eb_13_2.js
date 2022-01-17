function(ignoreDirection)
{
    this.isExecutingSuperMove_ = false;
    this.isLosing_ = false;
    this.lastShadowLeft_ = null;
    this.lastShadowRight_ = null;
    this.canHoldAirborne_ = true;
    this.showSlideDirt_ = true;
    this.isPaused_ = false;

    //this.canInterrupt_ = false;
    this.ignoreCollisionsWith_ = "";
    this.ignoreCollisionsWithOtherTeam_ = false;
    this.forceImmobile_ = false;
    this.ignoreHoldFrame_ = false;
    this.mustClearAllowBlock_ = false;
    this.mustClearAllowAirBlock_ = false;
    /*this is the combo against THIS player! Not against other players*/
    this.ResetCombo();
    this.interuptAnimation_ = null;
    this.currentAnimation_ = null;
    this.currentFrame_ = null;
    this.onAnimationCompleteFn_ = null;
    this.isFacingRight_ = true;
    if (!ignoreDirection)
        this.direction_ = 1;
    this.health_ = 100;
    this.flags_ = new PlayerFlags(this);
    this.keyState_ = 0;
    this.keyStates_ = [];
    this.isInAttackFrame_ = false;

    this.lastKeyStates_ = [];
    this.clearKeyStateCount_ = 0;
    this.adjustShadowPosition_ = true;
    this.mustChangeDirection_ = 0;
    this.blockedProjectiles_ = {};
    this.blockedAttacks_ = [];
    this.blockedAirAttacks_ = [];

    this.giveHitFn_ = null;
    this.isBeingThrown_ = false;
    this.grappledPlayer_ = null;
    this.x_ = 0;
    this.y_ = 0;
    this.lastFrameY_ = 0;
    this.constY_ = 0;
    this.yBottomOffset_ = 0;
    this.yTopOffset_ = 0;
    this.fx_ = 0;
    this.fy_ = 0;
    this.lastFx_ = 0;
    this.lastFy_ = 0;
    /*jump velocity*/
    this.jumpVelocityX_ = 0;
    this.jumpVelocityY_ = 0;
    this.zOrder_ = null;
    this.sounds_ = [];
    /**/
    this.t_ = 0;
    this.frameFreeze_ = 0;
    this.isSliding_ = false;
    this.slideCount_ = 0;
    this.isDead_ = false;
    this.moveCount_ = 0;
    this.registeredHit_ = new RegisteredHit();
    this.lastHitFrame_ = {};
    this.winningFrame_ = CONSTANTS.NO_FRAME;
    this.target_ = 0;
    this.SetX(0);
    this.SetY(STAGE.FLOORY);
    this.ClearProjectiles();
}
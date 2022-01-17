function ()
{
    this.user1_ = null;
    this.user2_ = null;
    this.frame_ = 0;
    this.keyboardState_ = {};
    this.keyState_ = 0;
    this.keyStates_ = [];
    this.lastTime_ = this.GetCurrentTime();
    this.speed_ = CONSTANTS.NORMAL_SPEED;
    this.targetFPS_ = CONSTANTS.TARGET_FPS;
    this.extraSpeed_ = 0;
    this.fontSystem_ = new FontSystem();
    this.text_ = this.fontSystem_.AddText("pnlText");
    this.useAlternateImageLoadingFunctions_ = window.navigator.userAgent.indexOf("Firefox") > -1;
    this.state_ = 0;
    this.isInitialized_ = false;
}
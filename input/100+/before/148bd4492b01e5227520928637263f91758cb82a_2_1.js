function(params)
{
    this.bgImg0_.xOffset = params.bg0XOffset_;
    this.bgImg0_.element.src = params.bg0Img_;
    this.bgImg1_.element.src = params.bg1Img_;
    this.bgImg0_.element.className = params.name_ + "-bg0";
    this.bgImg1_.element.className = params.name_ + "-bg1";
    this.maxLeftScroll_  = params.maxLeftScroll_; 
    this.maxRightScroll_ = params.maxRightScroll_;

    this.music_ = "audio/" + params.name_ + "/theme.zzz";
    soundManager_.Load(this.music_);
    this.fadeOutMusic_ = 0;
}
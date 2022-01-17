function(goodGuys,badGuys, stage)
{
    this.Break();
    announcer_.Release();
    if(!!this.match_)
        this.match_.Release();
    this.speed_ = CONSTANTS.NORMAL_SPEED;
    var goodGuys = goodGuys;
    var badGuys = badGuys;
    var stage = stage;

    if(!!this.charSelect_)
    {
        goodGuys = goodGuys || this.charSelect_.GetGoodGuys();
        badGuys = badGuys || this.charSelect_.GetBadGuys();
        stage = stage || this.charSelect_.GetStage();

        this.charSelect_.Release();
    }

    this.match_ = new Match();
    announcer_.SetMatch(this.match_);
    this.Init();
    this.InitDOM();
    this.PreloadTextImages();

    this.managed_ = this.match_;

    this.match_.stage_.Set(stage);
    this.match_.Start(goodGuys,badGuys);
    this.isInitialized_ = true;
    this.frame_ = 0;
    this.RunGameLoop();
}
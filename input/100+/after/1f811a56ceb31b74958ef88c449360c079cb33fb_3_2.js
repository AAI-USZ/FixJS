function()
{
    if(this.gotoNewRoundFrame_ != CONSTANTS.NO_FRAME)
    {
        this.allowInput_ = false;
        ++this.round_;
        this.GetGame().SetSpeed(CONSTANTS.NORMAL_SPEED);
        this.gotoNewRoundFrame_ = CONSTANTS.NO_FRAME;
        this.teamA_.Cursor = 0;
        this.teamB_.Cursor = 0;
        this.isSuperMoveActive_ = false;


        this.GetGame().ResetFrame();

        this.teamA_.Energybar.Change(0,0);
        this.teamB_.Energybar.Change(0,0);

        if(!!this.teamA_.Players[0])
            this.teamA_.Players[0].SetX(STAGE.START_X);
        if(!!this.teamB_.Players[0])
            this.teamB_.Players[0].SetX(STAGE.START_X);

        /*set the starting locations for each player*/
        for(var i = 0; i < this.teamA_.Players.length; ++i)
        {
            this.teamA_.Players[i].Reset(true);
            this.teamA_.Players[i].SetDirection(-1);
            this.teamA_.Players[i].SetX(STAGE.START_X + (STAGE.START_X_OFFSET * i));
        }
        for(var i = 0; i < this.teamB_.Players.length; ++i)
        {
            this.teamB_.Players[i].Reset(true);
            this.teamB_.Players[i].SetDirection(1);
            this.teamB_.Players[i].SetX(STAGE.START_X + (STAGE.START_X_OFFSET * i));
        }

        this.isRoundOver_ = false;
        this.stage_.Reset();
        this.GetGame().ReleaseText();

        this.teamA_.Healthbar.Reset();
        this.teamB_.Healthbar.Reset();
    }
}
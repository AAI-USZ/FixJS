function()
    {
        if(this.GetGotoNewRoundFrame() != CONSTANTS.NO_FRAME)
        {
            this.SetAllowInput(false);
            this.SetRound(this.GetRound() + 1);
            this.GetGame().SetSpeed(CONSTANTS.NORMAL_SPEED);
            this.SetGotoNewRoundFrame(CONSTANTS.NO_FRAME);
            this.TeamA.SetCursor(0);
            this.TeamB.SetCursor(0);
            this.SetSuperMoveActive(false);


            this.GetGame().ResetFrame();

            this.TeamA.GetEnergybar().Change(0,0);
            this.TeamB.GetEnergybar().Change(0,0);

            if(!!this.TeamA.GetPlayer(0))
                this.TeamA.GetPlayer(0).SetX(STAGE.START_X);
            if(!!this.TeamB.GetPlayer(0))
                this.TeamB.GetPlayer(0).SetX(STAGE.START_X);

            /*set the starting locations for each player*/
            for(var i = 0; i < this.TeamA.GetPlayers().length; ++i)
            {
                this.TeamA.GetPlayer(i).Reset(true);
                this.TeamA.GetPlayer(i).SetDirection(-1);
                this.TeamA.GetPlayer(i).SetX(STAGE.START_X + (STAGE.START_X_OFFSET * i));
            }
            for(var i = 0; i < this.TeamB.GetPlayers().length; ++i)
            {
                this.TeamB.GetPlayer(i).Reset(true);
                this.TeamB.GetPlayer(i).SetDirection(1);
                this.TeamB.GetPlayer(i).SetX(STAGE.START_X + (STAGE.START_X_OFFSET * i));
            }

            this.SetRoundOver(false);
            this.GetStage().Init();
            this.GetGame().ReleaseText();

            this.TeamA.GetHealthbar().Reset();
            this.TeamB.GetHealthbar().Reset();
        }
    }
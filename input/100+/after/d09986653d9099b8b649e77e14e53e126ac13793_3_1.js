function()
    {
        if(this.GetGotoNewRoundFrame() != CONSTANTS.NO_FRAME)
        {
            this.SetAllowInput(false);
            this.SetRound(this.GetRound() + 1);
            this.GetGame().SetSpeed(CONSTANTS.NORMAL_SPEED);
            this.SetGotoNewRoundFrame(CONSTANTS.NO_FRAME);
            this.GetTeamA().SetCursor(0);
            this.GetTeamB().SetCursor(0);
            this.SetSuperMoveActive(false);


            this.GetGame().ResetFrame();

            this.GetTeamA().GetEnergybar().Change(0,0);
            this.GetTeamB().GetEnergybar().Change(0,0);

            if(!!this.GetTeamA().GetPlayer(0))
                this.GetTeamA().GetPlayer(0).SetX(STAGE.START_X);
            if(!!this.GetTeamB().GetPlayer(0))
                this.GetTeamB().GetPlayer(0).SetX(STAGE.START_X);

            /*set the starting locations for each player*/
            for(var i = 0; i < this.GetTeamA().GetPlayers().length; ++i)
            {
                this.GetTeamA().GetPlayer(i).Reset(true);
                this.GetTeamA().GetPlayer(i).SetDirection(-1);
                this.GetTeamA().GetPlayer(i).SetX(STAGE.START_X + (STAGE.START_X_OFFSET * i));
            }
            for(var i = 0; i < this.GetTeamB().GetPlayers().length; ++i)
            {
                this.GetTeamB().GetPlayer(i).Reset(true);
                this.GetTeamB().GetPlayer(i).SetDirection(1);
                this.GetTeamB().GetPlayer(i).SetX(STAGE.START_X + (STAGE.START_X_OFFSET * i));
            }

            this.SetRoundOver(false);
            this.GetStage().Init();
            this.GetGame().ReleaseText();

            this.GetTeamA().GetHealthbar().Reset();
            this.GetTeamB().GetHealthbar().Reset();
        }
    }
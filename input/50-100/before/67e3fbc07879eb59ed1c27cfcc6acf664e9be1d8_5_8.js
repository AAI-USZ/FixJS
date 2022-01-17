function(frame)
    {

        this.GetTeamA().Render(frame,this.GetStage().x_ - this.GetStage().lastX_);
        this.GetTeamB().Render(frame,this.GetStage().x_ - this.GetStage().lastX_);

        this.GetStage().Render();

    }
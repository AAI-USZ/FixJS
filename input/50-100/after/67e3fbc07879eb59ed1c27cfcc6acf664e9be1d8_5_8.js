function(frame)
    {

        this.TeamA.Render(frame,this.GetStage().x_ - this.GetStage().lastX_);
        this.TeamB.Render(frame,this.GetStage().x_ - this.GetStage().lastX_);

        this.GetStage().Render();

    }
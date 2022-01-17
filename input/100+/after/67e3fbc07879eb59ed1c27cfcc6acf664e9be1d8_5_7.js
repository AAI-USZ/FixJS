function(frame,keyboardState)
    {

        this.GetStage().FrameMove(frame);
        this.GetHitSystem().FrameMove(frame);

        this.TeamA.FrameMove(frame,keyboardState,this.GetStage().x_, this.GetStage().y_);
        this.TeamB.FrameMove(frame,keyboardState,this.GetStage().x_, this.GetStage().y_);

        if((this.GetGotoNewRoundFrame() != CONSTANTS.NO_FRAME) && (frame > (this.GetGotoNewRoundFrame() + CONSTANTS.GOTO_NEW_ROUND_DELAY)))
            this.Reset();
        if(frame == CONSTANTS.ANNOUNCE_NEW_ROUND_DELAY)
            this.StartNewRound(frame);
        if(frame == CONSTANTS.START_NEW_ROUND_DELAY)
            this.EndNewRound(frame);
    }
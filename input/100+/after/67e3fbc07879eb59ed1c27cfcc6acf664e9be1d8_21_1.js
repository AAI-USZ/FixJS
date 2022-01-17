function(frame, keyboardState, x, y)
    {
        if(frame % 100 == 0)
            this.SetCursor(((this.GetCursor() + 1) < nbPlayers_) ? (this.GetCursor()+1) : 0);

        for(var i = 0, length = nbPlayers_; i < length; ++i)
            this.GetPlayer(i).HandleInput(keyboardState,frame);
        for(var i = 0, length = nbPlayers_; i < length; ++i)
            this.GetPlayer(i).OnFrameMove(frame,x,y);

        this.GetHealthbar().FrameMove(frame);
        this.GetEnergybar().FrameMove(frame);
    }
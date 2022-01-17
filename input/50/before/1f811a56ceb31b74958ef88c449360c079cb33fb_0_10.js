function()
    {
        if(!!game_.match_)
        {
            this.P2().SetAI(CreateSimpleRyuAI);
        }
        return null;
    }
function()
    {
        if(!!game_.GetMatch())
        {
            this.P2().SetAI(CreateSimpleRyuAI);
        }
        return null;
    }
function()
    {
        if(!!game_.GetMatch())
        {
            this.P1().SetAI(CreateSimpleRyuAI);
        }
        return null;
    }
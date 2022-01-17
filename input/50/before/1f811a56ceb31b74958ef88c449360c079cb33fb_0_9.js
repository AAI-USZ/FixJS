function()
    {
        if(!!game_.match_)
        {
            this.P1().SetAI(CreateSimpleRyuAI);
        }
        return null;
    }
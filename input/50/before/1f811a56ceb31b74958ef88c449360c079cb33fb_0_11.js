function(index)
    {
        if(!!game_.match_)
        {
            this.T1(index || 0).SetAI(CreateSimpleRyuAI);
        }
        return null;
    }
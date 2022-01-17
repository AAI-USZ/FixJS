function(index)
    {
        if(!!game_.match_)
        {
            this.T2(index || 0).SetAI(CreateSimpleRyuAI);
        }
        return null;
    }
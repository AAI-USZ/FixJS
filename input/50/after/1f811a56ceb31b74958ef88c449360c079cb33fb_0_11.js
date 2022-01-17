function(index)
    {
        if(!!game_.GetMatch())
        {
            this.T1(index || 0).SetAI(CreateSimpleRyuAI);
        }
        return null;
    }
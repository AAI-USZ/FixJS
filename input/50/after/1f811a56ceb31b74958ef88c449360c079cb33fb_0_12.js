function(index)
    {
        if(!!game_.GetMatch())
        {
            this.T2(index || 0).SetAI(CreateSimpleRyuAI);
        }
        return null;
    }
function(mode)
    {
        var retVal = mode;
        try
        {
            if(mode == 'A') retVal = 'TRANSIT,WALK';
            if(mode == 'T') retVal = 'BUSISH,WALK';
            if(mode == 'B') retVal = 'TRAINISH,WALK';
        }
        catch(e)
        {}

        return retVal;
    }
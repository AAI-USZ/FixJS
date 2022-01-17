function(mode)
    {
        var retVal = mode;
        try
        {
            if(mode == 'A') retVal = 'TRANSIT,WALK';
            if(mode == 'B') retVal = 'BUSISH,WALK';
            if(mode == 'T') retVal = 'TRAINISH,WALK';
        }
        catch(e)
        {}

        return retVal;
    }
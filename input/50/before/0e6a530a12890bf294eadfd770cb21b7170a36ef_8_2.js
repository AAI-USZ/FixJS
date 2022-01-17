function safeRegexp(source)
    {
        try
        {
            return RegExp(source, 'i');
        }
        catch(e)
        {
        }
    }
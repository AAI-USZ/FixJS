function(elt)
    {
        var element = recognizer.matches(elt);
        if (element)
        {
            filter.unwatchWindow(recognizer.getWindow());
            return element;
        }
        return null;
    }
function(elt, event)
    {
        var element = recognizer.matches(elt, event);
        if (element)
        {
            filter.unwatchWindow(recognizer.getWindow());
            return element;
        }
        return null;
    }
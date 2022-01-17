function(elt, event)
    {
        var element = filter.checkElement(elt, event);
        if (element)
        {
            return element;
        }
        else
        {
            var child = elt.firstChild;
            for (; child; child = child.nextSibling)
            {
                var element = this.checkElementDeep(child, event);
                if (element)
                    return element;
            }
        }

        return null;
    }
function(elt)
    {
        var element = filter.checkElement(elt);
        if (element)
        {
            return element;
        }
        else
        {
            var child = elt.firstChild;
            for (; child; child = child.nextSibling)
            {
                var element = this.checkElementDeep(child);
                if (element)
                    return element;
            }
        }

        return null;
    }
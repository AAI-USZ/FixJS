function(target, value, previousValue)
    {
        // Remove all of the nodes in the last range we created, except for
        // the first one, because setOuterHTML will replace it
        var first = this.editingElements[0], last = this.editingElements[1];
        if (last && last != first)
        {
            for (var child = first.nextSibling; child;)
            {
                var next = child.nextSibling;
                child.parentNode.removeChild(child);
                if (child == last)
                    break;
                else
                    child = next;
            }
        }

        // Make sure that we create at least one node here, even if it's just
        // an empty space, because this code depends on having something to replace
        if (!value)
            value = " ";

        if (this.innerEditMode)
            this.editingElements[0].innerHTML = value;
        else
            this.editingElements = Dom.setOuterHTML(this.editingElements[0], value);

        var element = Firebug.getRepObject(target);
        if (!element)
            return;

        // Make sure the object status path (in the toolbar) is updated.
        var panel = Firebug.getElementPanel(target);
        Events.dispatch(Firebug.uiListeners, "onObjectChanged", [element, panel]);
    }
function(popup)
    {
        var mode = this.getCurrentEditorName();
        if (!mode)
            return;

        for (var child = popup.firstChild; child; child = child.nextSibling)
        {
            if (child.localName == "menuitem")
            {
                if (child.id == "menu_firebug_" + this.getEditorOptionKey()+mode)
                    child.setAttribute("checked", true);
                else
                    child.removeAttribute("checked");
            }
        }
    }
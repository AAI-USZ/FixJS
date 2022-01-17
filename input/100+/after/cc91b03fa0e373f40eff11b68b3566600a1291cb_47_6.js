function(event)
    {
        var panel = Firebug.getElementPanel(event.target);

        if (Dom.getAncestorByClass(event.target, "breakpointCheckbox"))
        {
            var node = event.target.parentNode.getElementsByClassName(
                "objectLink-sourceLink").item(0);

            if (!node)
                return;

            var sourceLink = node.repObject;

            panel.noRefresh = true;
            var checkBox = event.target;
            var bpRow = Dom.getAncestorByClass(checkBox, "breakpointRow");

            if (checkBox.checked)
            {
                this.enableBreakpoint(sourceLink.href, sourceLink.line);
                bpRow.setAttribute("aria-checked", "true");
            }
            else
            {
                this.disableBreakpoint(sourceLink.href, sourceLink.line);
                bpRow.setAttribute("aria-checked", "false");
            }
            panel.noRefresh = false;
        }
        else if (Dom.getAncestorByClass(event.target, "closeButton"))
        {
            panel.noRefresh = true;
            var sourceLink = event.target.parentNode.getElementsByClassName(
                "objectLink-sourceLink").item(0).repObject;

            var head = Dom.getAncestorByClass(event.target, "breakpointBlock");
            var groupName = Css.getClassValue(head, "breakpointBlock");

            this.removeBreakpoint(groupName, sourceLink.href, sourceLink.line);

            panel.noRefresh = false;
        }

        panel.refresh();
    }
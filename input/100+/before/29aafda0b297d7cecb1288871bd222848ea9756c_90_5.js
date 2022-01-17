function(breakpoint, target)
    {
        var head = Dom.getAncestorByClass(target, "breakpointBlock");
        var groupName = Css.getClassValue(head, "breakpointBlock");

        var items = [{
            label: "breakpoints.Remove_Breakpoint",
            tooltiptext: "breakpoints.tip.Remove_Breakpoint",
            command: Obj.bindFixed(this.removeBreakpoint, this, groupName,
                breakpoint.href, breakpoint.lineNumber)
        }];

        if (groupName == "breakpoints")
        {
            if (breakpoint.checked)
            {
                items.push({
                    label: "breakpoints.Disable_Breakpoint",
                    tooltiptext: "breakpoints.tip.Disable_Breakpoint",
                    command: Obj.bindFixed(this.disableBreakpoint, this, breakpoint.href,
                        breakpoint.lineNumber)
                });
            }
            else
            {
                items.push({
                    label: "breakpoints.Enable_Breakpoint",
                    tooltiptext: "breakpoints.tip.Enable_Breakpoint",
                    command: Obj.bindFixed(this.enableBreakpoint, this, breakpoint.href,
                        breakpoint.lineNumber)
                });
            }
        }

        items.push(
             "-"
        );

        return items;
    }
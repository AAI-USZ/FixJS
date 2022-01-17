function(url, lineNo, isSet)
    {
        for (var i = 0; i < Firebug.TabWatcher.contexts.length; ++i)
        {
            var context = Firebug.TabWatcher.contexts[i];
            var panel = context.getPanel("console", true);
            if (panel)
            {
                panel.context.invalidatePanels("breakpoints");

                for (var row = panel.panelNode.firstChild; row; row = row.nextSibling)
                {
                    var error = row.firstChild.repObject;
                    if (error instanceof FirebugReps.ErrorMessageObj && error.href == url &&
                        error.lineNo == lineNo)
                    {
                        if (isSet)
                            Css.setClass(row.firstChild, "breakForError");
                        else
                            Css.removeClass(row.firstChild, "breakForError");

                        Firebug.connection.dispatch( "onToggleErrorBreakpoint",
                            [context, url, lineNo, isSet]);
                    }
                }
            }
        }
    }
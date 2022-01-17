function(canceled, waitForClick)
    {
        if (!this.inspecting)
            return;

        var context = this.inspectingContext;

        if (context.stopped)
            Firebug.Debugger.freeze(context);

        if (this.inspectTimeout)
        {
            context.clearTimeout(this.inspectTimeout);
            delete this.inspectTimeout;
        }

        this.detachInspectListeners(context);
        if (!waitForClick)
            this.detachClickInspectListeners(context.window);

        Firebug.chrome.setGlobalAttribute("cmd_toggleInspecting", "checked", "false");

        this.inspecting = false;

        if (this.inspectingPanel)
        {
            Firebug.chrome.unswitchToPanel(context, this.inspectingPanel.name, canceled);
            this.inspectingPanel.stopInspecting(this.inspectingNode, canceled);
        }
        else
        {
            FBTrace.sysout("inspector.stopInspecting; ERROR? inspectingPanel is NULL");
        }

        Events.dispatch(this.fbListeners, "onStopInspecting", [context, this.inspectingNode, canceled]);

        this.inspectNode(null);

        // Make sure there are no (indirect) references to the page document.
        this.inspectingPanel = null;
        this.inspectingContext = null;

        if (Firebug.isDetached())
            window.focus();
    }
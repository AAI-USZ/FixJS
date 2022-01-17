function(context)
    {
        if (this.inspecting || !context || !context.loaded)
            return;

        this.clearAllHighlights();

        this.inspecting = true;
        this.inspectingContext = context;

        Firebug.chrome.setGlobalAttribute("cmd_firebug_toggleInspecting", "checked", "true");
        this.attachInspectListeners(context);

        var inspectingPanelName = this._resolveInspectingPanelName(context);
        this.inspectingPanel = Firebug.chrome.switchToPanel(context, inspectingPanelName);

        if (Firebug.isDetached())
            context.window.focus();
        else if (Firebug.isMinimized())
            Firebug.showBar(true);

        this.inspectingPanel.panelNode.focus();
        this.inspectingPanel.startInspecting();

        Events.dispatch(this.fbListeners, "onStartInspecting", [context]);

        if (context.stopped)
            Firebug.Debugger.thaw(context);

        var hoverNodes = context.window.document.querySelectorAll(":hover");

        if (hoverNodes.length != 0)
            this.inspectNode(hoverNodes[hoverNodes.length-1]);
    }
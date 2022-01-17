function(state)
    {
        var enabled = this.isEnabled();
        if (!enabled)
            return;

        var active = !this.showWarning();

        if (active)
        {
            Events.addEventListener(this.panelNode.ownerDocument, "keypress", this.onKeyPress, true);
            Events.addEventListener(this.resizeEventTarget, "resize", this.onResize, true);

            this.location = this.getDefaultLocation();

            if (this.context.loaded)
            {
                if (!this.restored)
                {
                    // remove the default location, if any
                    delete this.location;
                    Persist.restoreLocation(this, state);
                    this.restored = true;
                }
                else
                {
                    // we already restored
                    if (!this.selectedSourceBox)
                    {
                        // but somehow we did not make a sourcebox?
                        this.navigate(this.location);
                    }
                    else
                    {
                        // then we can sync the location to the sourcebox
                        this.updateSourceBox(this.selectedSourceBox);
                    }
                }

                if (state)
                {
                    if (state.location)
                    {
                        var sourceLink = new SourceLink.SourceLink(state.location.getURL(),
                            state.previousCentralLine, "js");

                        // Causes the Script panel to show the proper location.
                        // Do not highlight the line (second argument true), we just want
                        // to restore the position.
                        // Also do it asynchronously, the script doesn't have to be
                        // available immediately.
                        this.showSourceLinkAsync(sourceLink, true);

                        // Do not restore the location again, it could happen during
                        // the single stepping and overwrite the debugger location.
                        delete state.location;
                    }

                    if (state.scrollTop)
                    {
                        this.selectedSourceBox.scrollTop = state.scrollTop;
                    }
                }
            }
            else // show default
            {
                this.navigate(this.location);
            }

            this.highlight(this.context.stopped);

            var breakpointPanel = this.context.getPanel("breakpoints", true);
            if (breakpointPanel)
                breakpointPanel.refresh();

            this.syncCommands(this.context);
            this.ableWatchSidePanel(this.context);
        }

        Dom.collapse(Firebug.chrome.$("fbToolbar"), !active);

        // These buttons are visible only, if debugger is enabled.
        this.showToolbarButtons("fbLocationSeparator", active);
        this.showToolbarButtons("fbDebuggerButtons", active);
        this.showToolbarButtons("fbLocationButtons", active);
        this.showToolbarButtons("fbScriptButtons", active);
        this.showToolbarButtons("fbStatusButtons", active);

        Firebug.chrome.$("fbRerunButton").setAttribute("tooltiptext",
            Locale.$STRF("firebug.labelWithShortcut", [Locale.$STR("script.Rerun"), "Shift+F8"]));
        Firebug.chrome.$("fbContinueButton").setAttribute("tooltiptext",
            Locale.$STRF("firebug.labelWithShortcut", [Locale.$STR("script.Continue"), "F8"]));
        Firebug.chrome.$("fbStepIntoButton").setAttribute("tooltiptext",
            Locale.$STRF("firebug.labelWithShortcut", [Locale.$STR("script.Step_Into"), "F10"]));
        Firebug.chrome.$("fbStepOverButton").setAttribute("tooltiptext",
            Locale.$STRF("firebug.labelWithShortcut", [Locale.$STR("script.Step_Over"), "F11"]));
        Firebug.chrome.$("fbStepOutButton").setAttribute("tooltiptext",
            Locale.$STRF("firebug.labelWithShortcut",
                [Locale.$STR("script.Step_Out"), "Shift+F11"]));

        // Additional debugger panels are visible only, if debugger is active.
        this.panelSplitter.collapsed = !active;
        this.sidePanelDeck.collapsed = !active;
    }
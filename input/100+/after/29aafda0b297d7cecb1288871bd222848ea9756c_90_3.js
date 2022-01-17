function(event)
    {
        // Don't continue if it's the wrong animation phase
        if (Math.floor(event.elapsedTime * 10) % (animationDuration * 20) != 0)
            return;

        Events.removeEventListener(event.target, "animationiteration",
            Firebug.Breakpoint.toggleTabHighlighting, true);

        var panel = Firebug.currentContext.getPanel(event.target.panelType.prototype.name);
        if (!panel)
            return;

        if (!panel.context.delayedArmedTab)
            return;

        panel.context.delayedArmedTab.setAttribute("breakOnNextArmed", "true");
        delete panel.context.delayedArmedTab;
    }
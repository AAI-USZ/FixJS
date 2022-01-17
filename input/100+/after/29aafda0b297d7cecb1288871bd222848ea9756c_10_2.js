function(context, title)
    {
        FBS.startProfiling();

        Firebug.chrome.setGlobalAttribute("cmd_firebug_toggleProfiling", "checked", "true");

        var originalTitle = title;
        var isCustomMessage = !!title;
        if (!isCustomMessage)
            title = Locale.$STR("ProfilerStarted");

        context.profileRow = this.logProfileRow(context, title);
        context.profileRow.customMessage = isCustomMessage;
        context.profileRow.originalTitle = originalTitle;

        Events.dispatch(this.fbListeners, "startProfiling", [context, originalTitle]);
        Firebug.Console.addListener(this);
    }
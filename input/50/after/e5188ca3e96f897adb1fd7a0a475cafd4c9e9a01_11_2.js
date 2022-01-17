function(browser, context)
    {
        Firebug.chrome.setGlobalAttribute("cmd_firebug_clearConsole", "disabled", !context);

        Firebug.ActivableModule.showContext.apply(this, arguments);
    }
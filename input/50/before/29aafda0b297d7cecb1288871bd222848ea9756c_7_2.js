function(browser, context)
    {
        Firebug.chrome.setGlobalAttribute("cmd_clearConsole", "disabled", !context);

        Firebug.ActivableModule.showContext.apply(this, arguments);
    }
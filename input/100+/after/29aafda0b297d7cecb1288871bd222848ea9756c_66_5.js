function(state)
    {
        // Update permission button in the toolbar.
        CookiePermissions.updatePermButton(this.context);

        // For backward compatibility with Firebug 1.1
        //
        // Firebug 1.6 removes Firebug.DisabledPanelPage, simplifies the activation
        // and the following code is not necessary any more.
        if (Firebug.ActivableModule && Firebug.DisabledPanelPage)
        {
            var shouldShow = Firebug.CookieModule.isEnabled(this.context);
            this.showToolbarButtons("fbCookieButtons", shouldShow);
            if (!shouldShow)
            {
                // The activation model has been changed in Firebug 1.4. This is 
                // just to keep backward compatibility.
                if (Firebug.DisabledPanelPage.show)
                    Firebug.DisabledPanelPage.show(this, Firebug.CookieModule);
                else
                    Firebug.CookieModule.disabledPanelPage.show(this);
                return;
            }
        }
        else
        {
            this.showToolbarButtons("fbCookieButtons", true); 
        }

        if (Firebug.chrome.setGlobalAttribute)
        {
            Firebug.chrome.setGlobalAttribute("cmd_firebug_resumeExecution", "breakable", "true");
            Firebug.chrome.setGlobalAttribute("cmd_firebug_resumeExecution", "tooltiptext",
                Locale.$STR("cookies.Break On Cookie"));
        }
    }
function(context)
    {
        if (Options.get(removeSessionConfirmation))
        {
            var check = {value: false};
            if (!prompts.confirmCheck(context.chrome.window, "Firecookie",
                Locale.$STR("firecookie.confirm.removeallsession"),
                Locale.$STR("firecookie.msg.Do not show this message again"), check))
                return;

            // Update 'Remove Session Cookies' confirmation option according to the value
            // of the dialog's "do not show again" checkbox.
            Options.set(removeSessionConfirmation, !check.value)
        }

        Firebug.CookieModule.onRemoveAllShared(context, true);
    }
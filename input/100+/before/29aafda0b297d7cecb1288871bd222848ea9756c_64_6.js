function(context)
    {
        if (Options.get(removeConfirmation))
        {
            var check = {value: false};
            if (!prompts.confirmCheck(context.chrome.window, "Firecookie",
                Locale.$STR("firecookie.confirm.removeall"),
                Locale.$STR("firecookie.msg.Do not show this message again"), check))
                return;

            // Update 'Remove Cookies' confirmation option according to the value
            // of the dialog's "do not show again" checkbox.
            Options.set(removeConfirmation, !check.value)
        }

        Firebug.CookieModule.onRemoveAllShared(context, false);
    }
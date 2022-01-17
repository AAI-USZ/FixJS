function(context)
    {
        if (Options.get(removeSessionConfirmation))
        {
            var check = {value: false};
            var flags = prompts.BUTTON_POS_0 * prompts.BUTTON_TITLE_YES +  
                prompts.BUTTON_POS_1 * prompts.BUTTON_TITLE_NO;  

            if (!prompts.confirmEx(context.chrome.window, Locale.$STR("Firebug"),
                Locale.$STR("cookies.confirm.removeallsession"), flags, "", "", "",
                Locale.$STR("cookies.msg.Do_not_show_this_message_again"), check) == 0)
            {
                return;
            }

            // Update 'Remove Session Cookies' confirmation option according to the value
            // of the dialog's "do not show again" checkbox.
            Options.set(removeSessionConfirmation, !check.value)
        }

        Firebug.CookieModule.onRemoveAllShared(context, true);
    }
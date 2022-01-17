function(popup)
    {
        var detachFirebug = Dom.getElementsByAttribute(popup, "id", "menu_firebug_detachFirebug")[0];
        if (detachFirebug)
        {
            detachFirebug.setAttribute("label", (Firebug.isDetached() ?
                Locale.$STR("firebug.AttachFirebug") : Locale.$STR("firebug.DetachFirebug")));
        }

        var toggleFirebug = Dom.getElementsByAttribute(popup, "id", "menu_firebug_toggleFirebug")[0];
        if (toggleFirebug)
        {
            var fbContentBox = FirebugChrome.$("fbContentBox");
            var collapsed = fbContentBox.getAttribute("collapsed");
            if (collapsed == "true")
            {
                toggleFirebug.setAttribute("label", Locale.$STR("inBrowser"));
                toggleFirebug.setAttribute("tooltiptext", Locale.$STR("inBrowser"));
            }
            else
            {
              toggleFirebug.setAttribute("label", Locale.$STR("firebug.menu.Minimize_Firebug"));
              toggleFirebug.setAttribute("tooltiptext", Locale.$STR("firebug.menu.tip.Minimize_Firebug"));
            }

            // If Firebug is detached, hide the menu ('Open Firebug' shortcut doesn't hide,
            // but just focuses the external window)
            if (Firebug.isDetached())
                toggleFirebug.setAttribute("collapsed", (collapsed == "true" ? "false" : "true"));
        }
    }
function()
    {
        var checked = Firebug.chrome.getGlobalAttribute("cmd_firebug_toggleCommandPopup", "checked");
        return (checked == "true") ? true : false;
    }
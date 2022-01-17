function()
    {
        var checked = Firebug.chrome.getGlobalAttribute("cmd_toggleCommandPopup", "checked");
        return (checked == "true") ? true : false;
    }
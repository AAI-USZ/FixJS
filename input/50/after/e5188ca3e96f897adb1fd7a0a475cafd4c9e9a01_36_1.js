function(name, value)
    {
        if (name == "breakOnErrors")
            Firebug.chrome.getElementById("cmd_firebug_breakOnErrors").setAttribute("checked", value);
    }
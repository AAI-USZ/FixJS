function(name, value)
    {
        if (name == "breakOnErrors")
            Firebug.chrome.getElementById("cmd_breakOnErrors").setAttribute("checked", value);
    }
function(row)
    {
        var chrome = FW.Firebug.chrome;
        var doc = chrome.window.document;
        FBTest.clickToolbarButton(chrome, "fbConsoleClear");

        var button = doc.getElementById("cmd_firebug_toggleMemoryProfiling");
        FBTest.ok(!button.checked, "'Memory Profile' button must not be pressed when 'Clear' button was pressed");

        callback();
    }
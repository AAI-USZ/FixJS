function(row)
    {
        FBTest.executeCommand("console.clear()");

        var doc = FW.Firebug.chrome.window.document;
        var button = doc.getElementById("cmd_firebug_toggleProfiling");
        FBTest.ok(!button.checked, "'Profile' button must not be pressed when 'console.clear()' was executed");

        callback();
    }
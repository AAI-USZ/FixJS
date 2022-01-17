function(win)
    {
        // TODO: open detached firebug via statusicon contextmenu
        FBTest.openFirebug();

        var tasks = new FBTest.TaskList();
        tasks.push(waitForDetachedFirebug);

        var chrome = FW.Firebug.chrome;
        var fbMenu = chrome.$("fbFirebugMenu");
        var menupopup;

        // test if right item is checked in ui location menu
        tasks.push(click, fbMenu);
        tasks.push(click, function()
        {
            var locMenu = fbMenu.querySelector("menu");
            menupopup = locMenu.querySelector("menupopup");
            return locMenu;
        });

        tasks.push(function(callback)
        {
            testMenuItem(callback, menupopup, 0);
        });

        // set position to "top"
        tasks.push(click, function()
        {
            FBTest.progress("setting Firebug to the top");
            return menupopup.children[1];
        })

        // Top menu-item must be checked
        tasks.push(function(callback)
        {
            testMenuItem(callback, menupopup, 1);
        });

        tasks.push(function(callback)
        {
            var frame = FW.Firebug.Firefox.getElementById("fbMainFrame");
            FBTest.ok(frame.parentNode.firstChild == frame, "positioned at the top");
            callback();
        });

        var buttons = chrome.$("fbWindowButtons");
        var contextPopup = buttons.querySelector("menupopup");
        tasks.push(click, buttons, {type:"contextmenu", button: 2});

        // return to the bottom
        tasks.push(click, function()
        {
            FBTest.progress("returning Firebug to the bottom");
            return contextPopup.children[2];
        });

        // Bottom menu-item must be checked.
        tasks.push(testMenuItem, contextPopup, 2);

        tasks.push(function(callback)
        {
            var frame = FW.Firebug.Firefox.getElementById("fbMainFrame");
            FBTest.ok(frame.parentNode.lastChild == frame, "positioned at the bottom");
            callback();
        });

        tasks.run(function()
        {
            FBTest.testDone("changeUILocation.DONE");
        });
    }
function(win)

    {

        var target = win.document.getElementById("selectbox");

        FBTest.executeContextMenuCommand(target, "menu_firebug_firebugInspect", function()

        {

            FBTest.testDone("issue5349.DONE");

        });

    }
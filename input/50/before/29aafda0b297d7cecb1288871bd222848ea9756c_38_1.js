function(win)

    {

        var target = win.document.getElementById("selectbox");

        FBTest.progress("target " + target);

        FBTest.executeContextMenuCommand(target, "menu_firebugInspect", function()

        {

            FBTest.testDone("issue5349.DONE");

        });

    }
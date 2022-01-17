function(row)
        {
            var  panel = FBTest.selectPanel("console");
            var spyLogRow = FW.FBL.getElementByClass(panel.panelNode, "spyTitleCol","spyCol");

            FBTest.click(spyLogRow);

            var spyLogRow2 = FW.FBL.getElementByClass(panel.panelNode, "netInfoJSONTab","netInfoTab");
            FBTest.click(spyLogRow2);

            var openedGroups = panel.panelNode.querySelectorAll(".memberLabelCell");
            FBTest.executeContextMenuCommand(openedGroups[0], "fbNetCopyJSON", function()
            {
                var expected =
                    '{"name":"foo","surname":"bar","address":{"no":"15","name":"foobar"}}';

                FBTest.waitForClipboard(expected,function(text)
                {
                    FBTest.compare(expected, text,
                        "Proper JSON must be in the clipboard. Current: " + text);
                    callback();
                });
            });
        }
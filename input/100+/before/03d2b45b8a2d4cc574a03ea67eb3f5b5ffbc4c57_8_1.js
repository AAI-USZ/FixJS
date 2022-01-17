function () {
            // Position popup windows in the lower right so they're out of the way
            var testWindowWid = 1000,
                testWindowHt  =  700,
                testWindowX   = window.screen.availWidth - testWindowWid,
                testWindowY   = window.screen.availHeight - testWindowHt,
                optionsStr    = "left=" + testWindowX + ",top=" + testWindowY +
                                ",width=" + testWindowWid + ",height=" + testWindowHt;
            testWindow = window.open(getBracketsSourceRoot() + "/index.html", "_blank", optionsStr);
            
            testWindow.executeCommand = function executeCommand(cmd, args) {
                return testWindow.brackets.test.CommandManager.execute(cmd, args);
            };
        }
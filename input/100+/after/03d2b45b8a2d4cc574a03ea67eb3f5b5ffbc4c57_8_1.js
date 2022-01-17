function () {
            // Position popup windows in the lower right so they're out of the way
            var testWindowWid = 1000,
                testWindowHt  =  700,
                testWindowX   = window.screen.availWidth - testWindowWid,
                testWindowY   = window.screen.availHeight - testWindowHt,
                optionsStr    = "left=" + testWindowX + ",top=" + testWindowY +
                                ",width=" + testWindowWid + ",height=" + testWindowHt;
            
            var params = new UrlParams();
            
            // setup extension loading in the test window
            params.put("extensions", _doLoadExtensions ? "default,user" : "default");
            
            _testWindow = window.open(getBracketsSourceRoot() + "/index.html?" + params.toString(), "_blank", optionsStr);
            
            _testWindow.executeCommand = function executeCommand(cmd, args) {
                return _testWindow.brackets.test.CommandManager.execute(cmd, args);
            };
        }
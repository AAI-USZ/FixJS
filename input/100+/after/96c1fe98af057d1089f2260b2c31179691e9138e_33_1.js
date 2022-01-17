function (require, exports, module) {
    'use strict';
    
    // Utility dependency
    var SpecRunnerUtils     = require("spec/SpecRunnerUtils.js"),
        ExtensionLoader     = require("utils/ExtensionLoader"),
        FileUtils           = require("file/FileUtils"),
        PerformanceReporter = require("perf/PerformanceReporter.js").PerformanceReporter;
    
    var suite;
        
    function getParamMap() {
        var params = document.location.search.substring(1).split('&'),
            paramMap = {},
            i,
            p;
    
        for (i = 0; i < params.length; i++) {
            p = params[i].split('=');
            paramMap[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
        }
        
        return paramMap;
    }
    
    function init() {
        var jasmineEnv = jasmine.getEnv(),
            runner = jasmineEnv.currentRunner(),
            currentWindowOnload = window.onload;
        
        // TODO: Issue 949 - the following code should be shared

        // Define core brackets namespace if it isn't already defined
        //
        // We can't simply do 'brackets = {}' to define it in the global namespace because
        // we're in "use strict" mode. Most likely, 'window' will always point to the global
        // object when this code is running. However, in case it isn't (e.g. if we're running 
        // inside Node for CI testing) we use this trick to get the global object.
        //
        // Taken from:
        //   http://stackoverflow.com/questions/3277182/how-to-get-the-global-object-in-javascript
        var Fn = Function, global = (new Fn('return this'))();
        if (!global.brackets) {
            global.brackets = {};
        }

        // Loading extensions requires creating new require.js contexts, which requires access to the global 'require' object
        // that always gets hidden by the 'require' in the AMD wrapper. We store this in the brackets object here so that 
        // the ExtensionLoader doesn't have to have access to the global object.
        brackets.libRequire = global.require;

        // Also store our current require.js context (the one that loads brackets core modules) so that extensions can use it
        // Note: we change the name to "getModule" because this won't do exactly the same thing as 'require' in AMD-wrapped
        // modules. The extension will only be able to load modules that have already been loaded once.
        brackets.getModule = require;

        var bracketsPath = FileUtils.getNativeBracketsDirectoryPath();

        // This returns path to test folder, so convert to src
        bracketsPath = bracketsPath.replace("brackets/test", "brackets/src");

        ExtensionLoader.testAllExtensionsInNativeDirectory(
            bracketsPath + "/extensions/default",
            "extensions/default"
        );
        ExtensionLoader.testAllExtensionsInNativeDirectory(
            bracketsPath + "/extensions/user",
            "extensions/user"
        );

        // Initiailize unit test preferences for each spec
        beforeEach(function () {
            // Unique key for unit testing
            localStorage.setItem("preferencesKey", SpecRunnerUtils.TEST_PREFERENCES_KEY);
        });
        
        afterEach(function () {
            // Clean up preferencesKey
            localStorage.removeItem("preferencesKey");
        });
        
        jasmineEnv.updateInterval = 1000;
        
        window.onload = function () {
            if (currentWindowOnload) {
                currentWindowOnload();
            }
            
            jasmineEnv.addReporter(new jasmine.BootstrapReporter(document));
            
            $("#show-dev-tools").click(function () {
                brackets.app.showDeveloperTools();
            });
            $("#reload").click(function () {
                window.location.reload(true);
            });
            
            suite = getParamMap().suite || localStorage.getItem("SpecRunner.suite") || "UnitTestSuite";
            
            // add performance reporting
            if (suite === "PerformanceTestSuite") {
                jasmineEnv.addReporter(new PerformanceReporter());
            }
            
            localStorage.setItem("SpecRunner.suite", suite);
            
            $("#" + suite).closest("li").toggleClass("active", true);
            
            var jsonResult = $.getJSON(suite + ".json");
            
            jsonResult.done(function (data) {
                // load specs and run jasmine
                require(data.specs, function () {
                    jasmineEnv.execute();
                });
            });
        };
    }

    init();
}
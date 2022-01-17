function (require, exports, module) {
    'use strict';
    
    // Utility dependency
    var SpecRunnerUtils     = require("spec/SpecRunnerUtils"),
        PerformanceReporter = require("perf/PerformanceReporter").PerformanceReporter,
        ExtensionLoader     = require("utils/ExtensionLoader"),
        Async               = require("utils/Async"),
        FileUtils           = require("file/FileUtils"),
        Menus               = require("command/Menus");
    
    // TODO: Issue 949 - the following code should be shared
    // Load modules that self-register and just need to get included in the main project
    require("document/ChangedDocumentTracker");
    
    // Load both top-level suites. Filtering is applied at the top-level as a filter to BootstrapReporter.
    require("test/UnitTestSuite");
    require("test/PerformanceTestSuite");
    
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
    
    function _loadExtensionTests() {
        var bracketsPath = FileUtils.getNativeBracketsDirectoryPath();

        // This returns path to test folder, so convert to src
        bracketsPath = bracketsPath.replace("brackets/test", "brackets/src");

        return Async.doInParallel(["default", "user"], function (dir) {
            return ExtensionLoader.testAllExtensionsInNativeDirectory(
                bracketsPath + "/extensions/" + dir,
                "extensions/" + dir
            );
        });
    }
    
    function _documentReadyHandler() {
        $("#show-dev-tools").click(function () {
            brackets.app.showDeveloperTools();
        });
        $("#reload").click(function () {
            window.location.reload(true);
        });
        
        $("#" + suite).closest("li").toggleClass("active", true);
        
        jasmine.getEnv().execute();
    }
    
    function init() {
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
        
        _loadExtensionTests().done(function () {
            var jasmineEnv = jasmine.getEnv();
    
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
            
            suite = getParamMap().suite || localStorage.getItem("SpecRunner.suite") || "UnitTestSuite";
            
            // Create a top-level filter to show/hide performance tests
            var isPerfSuite = (suite === "PerformanceTestSuite"),
                performanceFilter = function (spec) {
                    if (spec.performance === true) {
                        return isPerfSuite;
                    }
                    
                    var suite = spec.suite;
                    
                    while (suite) {
                        if (suite.performance === true) {
                            return isPerfSuite;
                        }
                        
                        suite = suite.parentSuite;
                    }
                    
                    return !isPerfSuite;
                };
            
            jasmineEnv.addReporter(new jasmine.BootstrapReporter(document, performanceFilter));
            
            // add performance reporting
            if (isPerfSuite) {
                jasmineEnv.addReporter(new PerformanceReporter());
            }
            
            localStorage.setItem("SpecRunner.suite", suite);
            
            $(window.document).ready(_documentReadyHandler);
        }).fail(function () {
            console.log("Error");
        });
    }

    init();
}
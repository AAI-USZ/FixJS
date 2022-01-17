function () {
            $("#show-dev-tools").click(function () {
                brackets.app.showDeveloperTools();
            });
            $("#reload").click(function () {
                window.location.reload(true);
            });
            
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
            
            $("#" + suite).closest("li").toggleClass("active", true);
            
            jasmineEnv.execute();
        }
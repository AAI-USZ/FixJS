function (spec) {
            var suite = spec.suite;
            
            // unit test suites have no category
            if (!isPerfSuite && !isExtSuite) {
                if (spec.category !== undefined) {
                    // if an individualy spec has a category, filter it out
                    return false;
                }
                
                while (suite) {
                    if (suite.category !== undefined) {
                        // any suite in the hierarchy may specify a category
                        return false;
                    }
                    
                    suite = suite.parentSuite;
                }
                
                return true;
            }
            
            var category = (isPerfSuite) ? "performance" : "extension";
            
            if (spec.category === category) {
                return true;
            }
            
            while (suite) {
                if (suite.category === category) {
                    return true;
                }
                
                suite = suite.parentSuite;
            }
            
            return false;
        }
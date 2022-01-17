function (spec) {
            if (!isPerfSuite && !isExtSuite) {
                return !spec.category;
            }
            
            var category = (isPerfSuite) ? "performance" : "extension";
            
            if (spec.category === category) {
                return true;
            }
            
            var suite = spec.suite;
            
            while (suite) {
                if (suite.category === category) {
                    return true;
                }
                
                suite = suite.parentSuite;
            }
            
            return false;
        }
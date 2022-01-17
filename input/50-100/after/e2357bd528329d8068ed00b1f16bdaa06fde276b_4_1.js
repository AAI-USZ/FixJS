function (spec) {
            // filterString is undefined when no top-level suite is active (e.g. "All", "HTMLUtils", etc.)
            // When undefined, all specs fail this filter and no tests are ran. This is by design.
            // This setup allows the SpecRunner to load initially without automatically running all tests.
            if (filterString === undefined) {
                return false;
            }
            
            if (!self._topLevelFilter(spec)) {
                return false;
            }
            
            if (filterString === "All") {
                return true;
            }

            if (spec.getFullName() === filterString) {
                return true;
            }
            
            // spec.getFullName() concatenates the names of all containing describe()s. We want to filter
            // on just the outermost suite's name (i.e., the item that was selected in the spec list UI)
            // to avoid ambiguity when suite names share the same prefix.
            var topLevelSuite = spec.suite;
            while (topLevelSuite.parentSuite) {
                topLevelSuite = topLevelSuite.parentSuite;
            }
            
            return topLevelSuite.description === filterString;
        }
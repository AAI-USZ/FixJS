function (defaults, defaultName, gradeNames) {
        var mergeArgs = [defaults];
        if (gradeNames) {
            var gradeStruct = fluid.resolveGradeStructure(gradeNames);
            mergeArgs = gradeStruct.optionsChain.reverse().concat(mergeArgs).concat({gradeNames: gradeStruct.gradeChain});
        }
        var mergePolicy = {};
        for (var i = 0; i < mergeArgs.length; ++ i) {
            mergePolicy = $.extend(true, mergePolicy, mergeArgs[i].mergePolicy);
        }
        mergeArgs = [mergePolicy, {}].concat(mergeArgs);
        var mergedDefaults = fluid.merge.apply(null, mergeArgs);
        return mergedDefaults;  
    }
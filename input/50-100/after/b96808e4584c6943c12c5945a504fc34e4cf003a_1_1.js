function (gradeName) {
            var options = fluid.rawDefaults(gradeName) || {};
            gs.gradeHash[gradeName] = true;
            gs.gradeChain.push(gradeName);
            gs.optionsChain.push(options);
            var oGradeNames = fluid.makeArray(options.gradeNames);
            fluid.each(oGradeNames, function (parent) {
                if (!gs.gradeHash[parent]) {
                    resolveGradesImpl(gs, parent);
                }
            });
        }
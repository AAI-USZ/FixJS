function (newModel, oldModel, changeSpec) {
            var path = changeSpec[0].path;
            var oscPath = that.options.paramMap[path];
            that.osc.input(oscPath, newModel[path]);
        }
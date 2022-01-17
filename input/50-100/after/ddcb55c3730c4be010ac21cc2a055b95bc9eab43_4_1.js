function (inputPath, expander, paths) {
        if (inputPath !== undefined) {
            paths.push(fluid.model.composePaths(expander.inputPrefix, inputPath));
        }
    }
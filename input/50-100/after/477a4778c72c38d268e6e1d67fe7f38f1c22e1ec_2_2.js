function (userOutputPath, value, expander) {
        // avoid crosslinking to input object - this might be controlled by a "nocopy" option in future
        var toset = fluid.copy(value); 
        var outputPath = fluid.model.composePaths(expander.outputPrefix, userOutputPath);
        // TODO: custom resolver config here to create non-hash output model structure
        if (toset !== undefined) {
            expander.applier.requestChange(outputPath, toset);
        }
        return userOutputPath? fluid.model.transform.NONDEFAULT_OUTPUT_PATH_RETURN: toset;
    }
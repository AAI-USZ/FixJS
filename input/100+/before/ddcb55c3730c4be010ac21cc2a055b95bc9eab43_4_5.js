function (expandSpec, expander) {
        var options = [];
        var togo = {
            type: "fluid.model.transform.valueMapper",
            options: options
        };
        var isArray = fluid.isArrayable(expandSpec.options);
        var findCustom = function (name) {
            return fluid.find(expandSpec.options, function (option) {
                if (option[name]) {
                    return true;
                }
            });
        };
        var anyCustomOutput = findCustom("outputPath");
        var anyCustomInput = findCustom("inputPath");
        if (!anyCustomOutput) {
            togo.inputPath = fluid.model.composePaths(expander.outputPrefix, expandSpec.outputPath);
        }
        if (!anyCustomInput) {
            togo.outputPath = fluid.model.composePaths(expander.inputPrefix, expander.inputPath);
        }
        var def = fluid.firstDefined;
        fluid.each(options, function (option, key) {
            var outOption = {};
            var origInputValue = def(isArray? option.inputValue : key, expandSpec.defaultInputValue);
            if (origInputValue === undefined) {
                fluid.fail("Failure inverting configuration for valueMapper - inputValue could not be resolved for record " + key + ": ", expandSpec);
            }
            outOption.outputValue = origInputValue;
            var origOutputValue = def(option.outputValue, expandSpec.defaultOutputValue);
            outOption.inputValue = origOutputValue;
            if (anyCustomOutput) {
                togo.inputPath = fluid.model.composePaths(expander.outputPrefix, def(option.outputPath, expandSpec.outputPath));
                }
            if (anyCustomInput) {
                togo.outputPath = fluid.model.composePaths(expander.inputPrefix, def(option.inputPath, expandSpec.inputPath));
            }
        });
        return togo;
    }
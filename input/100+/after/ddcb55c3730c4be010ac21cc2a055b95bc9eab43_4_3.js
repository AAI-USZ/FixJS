function (expandSpec, expander) {
        if (!expandSpec.options) {
            fluid.fail("demultiplexValue requires a list or hash of options at path named \"options\", supplied ", expandSpec);
        }
        var value = fluid.model.transform.getValue(expandSpec.inputPath, undefined, expander);
        var deref = fluid.isArrayable(expandSpec.options) ? // long form with list of records    
            function (testVal) {
                var index = fluid.model.transform.matchValueMapperFull(testVal, expander, expandSpec);
                return index === -1 ? null : expandSpec.options[index];
            } : 
            function (testVal) {
                return expandSpec.options[testVal];
            };
      
        var indexed = deref(value);
        if (!indexed) {
            // if no branch matches, try again using this value - WARNING, this seriously
            // threatens invertibility
            indexed = deref(expandSpec.defaultInputValue);
        }
        if (!indexed) {
            return;
        }
        var outputValue = fluid.isPrimitive(indexed) ? indexed : 
            (indexed.undefinedOutputValue ? undefined : 
                (indexed.outputValue === undefined ? expandSpec.defaultOutputValue : indexed.outputValue));
        var outputPath = indexed.outputPath === undefined ? expandSpec.outputPath : indexed.outputPath;
        return fluid.model.transform.setValue(outputPath, outputValue, expander); 
    }
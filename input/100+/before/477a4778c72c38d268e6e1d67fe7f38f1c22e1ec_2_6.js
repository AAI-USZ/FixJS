function ($) {

    fluid.registerNamespace("fluid.model.transform");
    
    /** Grade definitions for standard transformation function hierarchy **/
    
    fluid.defaults("fluid.transformFunction", {
        gradeNames: "fluid.function"
    });
    
    // uses standard layout and workflow involving inputPath
    fluid.defaults("fluid.standardInputTransformFunction", {
        gradeNames: "fluid.transformFunction"  
    });
    
    fluid.defaults("fluid.standardOutputTransformFunction", {
        gradeNames: "fluid.transformFunction"  
    });
    
    // uses the standard layout and workflow involving inputPath and outputPath
    fluid.defaults("fluid.standardTransformFunction", {
        gradeNames: ["fluid.standardInputTransformFunction", "fluid.standardOutputTransformFunction"]  
    });
    
    fluid.defaults("fluid.lens", {
        gradeNames: "fluid.transformFunction",
        invertConfiguration: null
        // this function method returns "inverted configuration" rather than actually performing inversion
        // TODO: harmonise with strategy used in VideoPlayer_framework.js
    });
    
    /***********************************
     * Base utilities for transformers *
     ***********************************/

    fluid.model.transform.pathToRule = function (inputPath) {
        return {
            expander: {
                type: "fluid.model.transform.value",
                inputPath: inputPath
            }
        };
    };
    
    fluid.model.transform.valueToRule = function (value) {
        return {
            expander: {
                type: "fluid.model.transform.literalValue",
                value: value
            }
        };
    };
        
    /** Accepts two fully escaped paths, either of which may be empty or null **/
    fluid.model.composePaths = function (prefix, suffix) {
        return !prefix ? suffix : (!suffix ? prefix : 
            prefix + "." + suffix);
    };

    fluid.model.transform.getValue = function (inputPath, value, expander) {
        var togo;
        if (inputPath) { // NB: We may one day want to reverse the crazy jQuery-like convention that "no path means root path"
            togo = fluid.get(expander.source, inputPath);
        }
        if (togo === undefined) {
            togo = fluid.isPrimitive(value) ? value : expander.expand(value);
        }
        return togo;
    };
    
    // distinguished value which indicates that a transformation rule supplied a 
    // non-default output path, and so the user should be prevented from making use of it
    // in a compound expander definition
    fluid.model.transform.NONDEFAULT_OUTPUT_PATH_RETURN = {};
    
    fluid.model.transform.setValue = function (userOutputPath, value, expander) {
        // avoid crosslinking to input object - this might be controlled by a "nocopy" option in future
        var toset = fluid.copy(value); 
        var outputPath = fluid.model.composePaths(expander.outputPrefix, userOutputPath);
        // TODO: custom resolver config here to create non-hash output model structure
        if (toset !== undefined) {
            fluid.set(expander.target, outputPath, toset);
        }
        return userOutputPath? fluid.model.transform.NONDEFAULT_OUTPUT_PATH_RETURN: toset;
    };
    
    /****************************************
     * Standard transformermation functions *
     ****************************************/
        
    fluid.model.transform.value = fluid.identity;
    
    fluid.defaults("fluid.model.transform.value", { 
        gradeNames: "fluid.standardTransformFunction",
        invertConfiguration: "fluid.model.transform.invertValue"
    });
    
    fluid.model.transform.invertValue = function (expandSpec, expander) {
        var togo = fluid.copy(expandSpec);
        // TODO: this will not behave correctly in the face of compound "value" which contains
        // further expanders
        togo.inputPath = fluid.model.composePaths(expander.outputPrefix, expandSpec.outputPath);
        togo.outputPath = fluid.model.composePaths(expander.inputPrefix, expander.inputPath);
        return togo;
    };
    
    fluid.model.transform.literalValue = function (expanderSpec) {
        return expanderSpec.value;  
    };
    
    fluid.defaults("fluid.model.transform.literalValue", { 
        gradeNames: "fluid.standardOutputTransformFunction"
    });
    
    fluid.model.transform.arrayValue = fluid.makeArray;
        
    fluid.defaults("fluid.model.transform.arrayValue", { 
        gradeNames: "fluid.standardTransformFunction"
    });
     
    fluid.model.transform.count = function (value) {
        return fluid.makeArray(value).length;
    };
    
    fluid.defaults("fluid.model.transform.count", { 
        gradeNames: "fluid.standardTransformFunction"
    });
     
    fluid.model.transform.firstValue = function (expandSpec, expander) {
        if (!expandSpec.values || !expandSpec.values.length) {
            fluid.fail("firstValue transformer requires an array of values at path named \"values\", supplied", expandSpec);
        }
        for (var i = 0; i < expandSpec.values.length; i++) {
            var value = expandSpec.values[i];
            var expanded = expander.expand(value);
            if (expanded !== undefined) {
                return expanded;
            }
        }
    };
    
    fluid.defaults("fluid.model.transform.firstValue", { 
        gradeNames: "fluid.transformFunction"
    });
    
    // TODO: Incomplete implementation which only checks expected paths
    fluid.deepEquals = function (expected, actual, stats) {
        if (fluid.isPrimitive(expected)) {
            if (expected === actual) {
                ++ stats.matchCount;
            } else {
                ++ stats.mismatchCount;
                stats.messages.push("Value mismatch at path " + stats.path + ": expected " + expected + " actual " + actual);
            }
        }
        else {
            if (typeof(expected) !== typeof(actual)) {
                ++ stats.mismatchCount;
                stats.messages.push("Type mismatch at path " + stats.path + ": expected " + typeof(expected) + " actual " + typeof(actual)); 
            }
            else {
                fluid.each(expected, function(value, key) {
                    stats.pathOps.push(key);
                    fluid.deepEquals(expected[key], actual[key], stats);
                    stats.pathOps.pop(key);
                });
            }
        }
    };
    
    fluid.model.transform.matchValue = function (expected, actual) {
        if (fluid.isPrimitive(expected)) {
            return expected === actual? 1 : 0;
        } else {
            var stats = {
                matchCount: 0,
                mismatchCount: 0,
                messages: []
            };
            stats.pathOps = fluid.model.makePathStack(expander, "path");
            fluid.deepEquals(expected, actual, stats);
            return stats.matchCount;
        }
    };
    
    fluid.model.transform.compareMatches = function (speca, specb) {
        return speca.matchCount - specb.matchCount;
    };
    
    fluid.firstDefined = function (a, b) {
        return a === undefined? b : a;
    };
    
    fluid.model.transform.matchValueMapperFull = function (outerValue, expander, expandSpec) {
        var o = expandSpec.options;
        if (o.length === 0) {
            fluid.fail("valueMapper supplied empty list of options: ", expandSpec);
        }
        if (o.length === 1) {
            return 0;
        }
        var matchPower = []; 
        for (var i = 0; i < o.length; ++ i) {
            var option = o[i];
            var value = fluid.firstDefined(fluid.model.transform.getValue(option.inputPath, undefined, expander),
                outerValue);
            var match = fluid.model.transform.matchValue(option.inputValue, value);
            matchPower[i] = {index: i, matchCount: match.matchCount};
        }
        matchPower.sort(fluid.model.transform.compareMatches);
        return matchPower[0].compareMatches === matchPower[1].compareMatches ? -1 : matchPower[0].index; 
    };

    fluid.model.transform.valueMapper = function (expandSpec, expander) {
        if (!expandSpec.options) {
            fluid.fail("demultiplexValue requires a list or hash of options at path named \"options\", supplied ", expandSpec);
        }
        var value = fluid.model.transform.getValue(expandSpec.inputPath, undefined, expander);
        var deref = fluid.isArrayable(expandSpec.options) ? // long form with list of records    
            function (testVal) {
                  var index = fluid.model.transform.matchValueMapperFull(testVal, expander, expandSpec);
                  return index === -1? null : expandSpec[index];
            } : 
            function (testVal) {
                 return expandSpec.options[testVal];
            };
      
        var indexed = deref(value);
        if (!indexed) {
            // if no branch matches, try again using this value - WARNING, this seriously
            // threatens invertibility
            indexed = deref(expandSpec.defaultInputValue);
        };
        if (!indexed) {
            fluid.fail("value ", value, " for valueMapper could not be looked up to an option, and no default inputValue supplied with ", expandSpec);
        }
        var outputValue = indexed.outputValue === undefined? expandSpec.defaultOutputValue : indexed.outputValue;
        var outputPath = indexed.outputPath === undefined? expandSpec.defaultOutputPath: indexed.outputPath;
        return fluid.model.transform.setValue(outputPath, outputValue, expander); 
    };
    
    fluid.model.transform.valueMapper.invert = function (expandSpec, expander) {
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
    };

    fluid.defaults("fluid.model.transform.valueMapper", { 
        gradeNames: ["fluid.transformFunction", "fluid.lens"],
        invertConfiguration: "fluid.model.transform.valueMapper.invert"
    });
    
    fluid.model.transform.prefixApplier = function (expandSpec, expander) {
        if (expandSpec.inputPrefix) {
            expander.inputPrefixOp.push(expandSpec.inputPrefix);
        }
        if (expandSpec.outputPrefix) {
            expander.outputPrefixOp.push(expandSpec.outputPrefix);
        }
        expander.expand(expandSpec.value);
        if (expandSpec.inputPrefix) {
            expander.inputPrefixOp.pop();
        }
        if (expandSpec.outputPrefix) {
            expander.outputPrefixOp.pop();
        }        
    };
    
    fluid.defaults("fluid.model.transform.prefixApplier", {
        gradeNames: ["fluid.transformFunction"]
    });
    
    fluid.model.makePathStack = function (expander, prefixName) {
        var stack = expander[prefixName + "Stack"] = [];
        expander[prefixName] = "";
        return {
            push: function (prefix) {
                var newPath = fluid.model.composePaths(expander[prefixName], prefix);
                stack.push(expander[prefixName]);
                expander[prefixName] = newPath;
            },
            pop: function () {
                expander[prefixName] = stack.pop();
            }
        };
    };
        
    fluid.model.transform.expandExpander = function (expandSpec, expander) {
        var typeName = expandSpec.type;
        if (typeName.indexOf(".") === -1) {
            typeName = "fluid.model.transform." + typeName;
        }
        var expanderFn = fluid.getGlobalValue(typeName);
        var expdef = fluid.defaults(typeName);
        if (typeof(expanderFn) !== "function") {
           fluid.fail("Transformation record specifies transformation function with name " + 
               expandSpec.type + " which is not a function - ", expanderFn);
        }
        if (!fluid.hasGrade(expdef, "fluid.transformFunction")) {
            // If no suitable grade is set up, assume that it is intended to be used as a standardTransformFunction
            expdef = fluid.defaults("fluid.standardTransformFunction");
        }
        var expanderArgs = [expandSpec, expander];
        if (fluid.hasGrade(expdef, "fluid.standardInputTransformFunction")) {
            var expanded = fluid.model.transform.getValue(expandSpec.inputPath, expandSpec.value, expander);
            expanderArgs[0] = expanded;
            expanderArgs[2] = expandSpec;
        }
        var transformed = expanderFn.apply(null, expanderArgs);
        if (fluid.hasGrade(expdef, "fluid.standardOutputTransformFunction")) {
            transformed = fluid.model.transform.setValue(expandSpec.outputPath, transformed, expander);
        }
        return transformed;
    };
    
    fluid.model.transform.expandWildcards = function (expander, source) {
        fluid.each(source, function (value, key) {
            var q = expander.queued;
            expander.pathOp.push(key.toString());
            for (var i = 0; i < q.length; ++ i) {
                var expandSpec = q[i].expandSpec;
                if (fluid.pathUtil.matchPath(expandSpec.inputPath, expander.path, true)) {
                    var esCopy = fluid.copy(expandSpec);
                    esCopy.inputPath = expander.path;
                    // TODO: allow some kind of interpolation for output path
                    esCopy.outputPath = expander.path;
                    fluid.model.transform.expandExpander(esCopy, expander);
                }
            }
            if (!fluid.isPrimitive(value)) {
                fluid.model.transform.expandWildcards(expander, value);
            }
            expander.pathOp.pop();
        });
    };
    
    fluid.model.transform.expandValue = function (rule, expander) {
        if (typeof(rule) === "string") {
            rule = fluid.model.transform.pathToRule(rule);
        }
        // special dispensation to allow "value" at top level
        // TODO: Proper escaping rules
        else if (rule.value && expander.outputPrefix !== "") {
            rule = fluid.model.transform.valueToRule(rule.value);
        }
        var togo;
        if (rule.expander) {
            var expanders = fluid.makeArray(rule.expander);
            for (var i = 0; i < expanders.length; ++ i) {
                var expandSpec = expanders[i];
                if (expander.inverting) {
                    var invertor = fluid.defaults(expandSpec.type).invertConfiguration;
                    if (invertor) {
                        var inverted = fluid.invokeGlobalFunction(invertor, [expandSpec, expander]);
                    }
                }
                else {
                    if (typeof(expandSpec.inputPath) === "string" && expandSpec.inputPath.indexOf("*") !== -1) {
                        expander.queued.push({expandSpec: expandSpec, outputPrefix: expander.outputPrefix, inputPrefix: expander.inputPrefix});
                        continue;
                    }
                    togo = fluid.model.transform.expandExpander(expandSpec, expander);
                }
            }
        } else {
            for (var key in rule) {
                var value = rule[key];
                expander.outputPrefixOp.push(key);
                expander.expand(value, expander);
                expander.outputPrefixOp.pop();
            }
            togo = fluid.get(expander.target, expander.outputPrefix);
        }
        return togo;
    };
    
    fluid.model.transform.makeExpander = function (expander, expandFn) {
        expander.expand = function (rules) {
            return expandFn(rules, expander);
        };
    }
    
    fluid.model.transform.invertConfiguration = function (rules) {
        var expander = {
            inverted: [],
            inverting: true
        };
        fluid.model.transform.makeExpander(expander, fluid.model.transform.expandValue);
        expander.expand(rules);
        return {
            expander: expander.inverted
        };
    };
    
    /**
     * Transforms a model based on a specified expansion rules objects.
     * Rules objects take the form of:
     *   {
     *       "target.path": "value.el.path" || {
     *          expander: {
     *              type: "expander.function.path",
     *               ...
     *           }
     *       }
     *   }
     *
     * @param {Object} source the model to transform
     * @param {Object} rules a rules object containing instructions on how to transform the model
     */
    fluid.model.transformWithRules = function (source, rules) {
        var expander = {
            source: source,
            target: fluid.freshContainer(source),
            queued: []
        };
        fluid.model.transform.makeExpander(expander, fluid.model.transform.expandValue);
        expander.outputPrefixOp = fluid.model.makePathStack(expander, "outputPrefix");
        expander.inputPrefixOp = fluid.model.makePathStack(expander, "inputPrefix");
        
        expander.expand(rules);
        if (expander.queued.length > 0) {
            expander.typeStack = [];
            expander.pathOp = fluid.model.makePathStack(expander, "path");
            fluid.model.transform.expandWildcards(expander, source);
        }
        return expander.target;
        
    };
    
    $.extend(fluid.model.transformWithRules, fluid.model.transform);
    fluid.model.transform = fluid.model.transformWithRules;
    
}
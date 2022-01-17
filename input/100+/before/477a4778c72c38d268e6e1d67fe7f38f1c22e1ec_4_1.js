function ($) {
    var source = {
        cat: "meow",
        dog: null,
        gerbil: undefined,
        goat: false,
        hamster: {
            wheel: "spin"
        },
        cow: {
            grass: "chew"
        },
        sheep: [
            "baaa",
            "wooooool"
        ],
        hippo: 0,
        polar: "grrr"
    };
    var cleanSource = fluid.copy(source);
    
    var testCase = jqUnit.TestCase("Model Transformation");
    
    function testOneExpander(message, model, expander, method, expected) {
        var transformed = fluid.model.transform(model, {value: {
            expander: expander}});
        jqUnit[method].apply(null, [message, expected, transformed.value]); 
    }
    
    var valueTests = [{
        message: "A value transform should resolve the specified path.", 
        expander: {
            type: "fluid.model.transform.value", 
            inputPath: "hamster.wheel"
        }, 
        method: "assertEquals", 
        expected: source.hamster.wheel
    }, {
        message: "When the path is valid, the value option should not be returned.", 
        expander: {
            type: "fluid.model.transform.value", 
            inputPath: "hamster.wheel",
            value: "hello!"
        }, 
        method: "assertNotEquals", 
        expected: "hello!"
    }, {
        message: "When the path's value is null, the value option should not be returned.",
        expander: {
            type: "fluid.model.transform.value", 
            inputPath: "dog",
            value: "hello!"
        }, 
        method: "assertNotEquals", 
        expected: "hello!"
    }, {
        message: "When the path's value is false, the value option should not be returned.",
        expander: {
            type: "fluid.model.transform.value", 
            inputPath: "goat",
            value: "hello!"
        }, 
        method: "assertNotEquals", 
        expected: "hello!"
    }, {
        message: "When the path's value is undefined, the value option should be returned.",
        expander: {
            type: "fluid.model.transform.value", 
            inputPath: "gerbil",
            value: "hello!"
        }, 
        method: "assertEquals", 
        expected: "hello!"
    }, {
        message: "When the path's value is not specified, the value option should be returned.",
        expander: {
            type: "fluid.model.transform.value", 
            value: "toothpick"
        }, 
        method: "assertEquals", 
        expected: "toothpick"
    }, {
        message: "When the path's value is defined, the referenced value should be returned.",
        expander: {
            type: "fluid.model.transform.value", 
            inputPath: "cat",
            value: "rrrrr"
        }, 
        method: "assertEquals", 
        expected: source.cat
    }, {
        message: "Where the path is a rules object, it the result should be an expanded version of it.",
        expander: {
            type: "fluid.model.transform.value", 
            value: {
               alligator: {
                   expander: {
                       type: "fluid.model.transform.value",
                       inputPath: "hamster"
                   }
               },
               tiger: {
                   expander: {
                       type: "fluid.model.transform.value",
                       inputPath: "hamster.wheel"
                   }
               }
           }
        }, 
        method: "assertDeepEq", 
        expected: {
            alligator: source.hamster,
            tiger: source.hamster.wheel
        }
    }
    ];
    
    var testOneStructure = function (tests) {
        for (var i = 0; i < tests.length; ++ i) {
            var v = tests[i];
            testOneExpander(v.message, v.model || source, v.expander, v.method, v.expected);
        }      
    }
    
    testCase.test("fluid.model.transform.value()", function () {
        testOneStructure(valueTests);
    });

    var transformToShortNames = {
        expander: {
            inputPath: "*.expander.type",
            type: "fluid.computeNickName"  
        }
    };
    
    testCase.test("Transform with wildcard path and short names", function () {
        var shortened = fluid.model.transform(valueTests, transformToShortNames);
        var expected = fluid.transform(valueTests, function(config) {
             return {
                 expander: {
                     type: fluid.computeNickName(config.expander.type)
                 }
             };
        });
        jqUnit.assertDeepEq("Transformed expander types to short names", expected, shortened);
        var newConfig = $.extend(true, [], valueTests, shortened);
        testOneStructure(newConfig);
    });

    var arrayValueTests = [{
        message: "arrayValue() should box a non-array value up as one.", 
        expander: {
            type: "fluid.model.transform.arrayValue", 
            inputPath: "cat"
        }, 
        method: "assertDeepEq", 
        expected: [source.cat]
    }, {
        message: "arrayValue() should not box up an array value.", 
        expander: {
            type: "fluid.model.transform.arrayValue", 
            inputPath: "sheep"
        }, 
        method: "assertDeepEq", 
        expected: source.sheep
    }];

    testCase.test("fluid.model.transform.arrayValue()", function () {
        testOneStructure(arrayValueTests);
    });

    var countTests = [{
        message: "count() should return a length of 1 for a non-array value.", 
        expander: {
            type: "fluid.model.transform.count", 
            inputPath: "cat"
        }, 
        method: "assertEquals", 
        expected: 1
    }, {
        message: "count() should return the length for array values.", 
        expander: {
            type: "fluid.model.transform.count", 
            inputPath: "sheep"
        }, 
        method: "assertEquals", 
        expected: 2
    }];

    testCase.test("fluid.model.transform.count()", function () {
        testOneStructure(countTests);
    });
    
    var createValuePathExpanders = function (paths) {        
        return {
            values: fluid.transform(paths, function (path) {
                return {
                    expander: {
                        type: "fluid.model.transform.value",
                        inputPath: path
                    }
                };
            })
        };
    };
    
    var firstValueTests = [{
        message: "firstValue() should return the first non-undefined value in paths", 
        expander: {
            type: "fluid.model.transform.firstValue", 
            values: ["cat", "dog"]
        }, 
        method: "assertEquals", 
        expected: source.cat
    }, {
        message: "firstValue() should return the second path value when the first is undefined", 
        expander: {
            type: "fluid.model.transform.firstValue", 
            values: ["gerbil", "cat"]
        }, 
        method: "assertEquals", 
        expected: source.cat
    }, {
        message: "firstValue() should return the first path value when is false", 
        expander: {
            type: "fluid.model.transform.firstValue", 
            values: ["goat", "cat"]
        }, 
        method: "assertEquals", 
        expected: source.goat
    }, {
        message: "firstValue() should return the first path value when is null", 
        expander: {
            type: "fluid.model.transform.firstValue", 
            values: ["dog", "cat"]
        }, 
        method: "assertEquals", 
        expected: source.dog
    }, {
        message: "firstValue() should return the first path value when is 0", 
        expander: {
            type: "fluid.model.transform.firstValue", 
            values: ["hippo", "cat"]
        }, 
        method: "assertEquals", 
        expected: source.hippo
    }];
    
    testCase.test("fluid.model.transform.firstValue()", function () {
        testOneStructure(firstValueTests);
    });
    
    var demuxModel = {
        tracking: "focus"  
    };
    
    var demuxOptions = {
        "mouse": {
            "outputPath": "FollowMouse",
            "outputValue": true
        },
        "focus": {
            "outputPath": "FollowFocus",
            "outputValue": true
         },
        "caret": {
            "outputPath": "FollowCaret",
            "outputValue": true
        }
    };
    
    var demultiplexTests = [{
        message: "valueMapper selects focus based on path",
        model: demuxModel, 
        expander: {
            type: "fluid.model.transform.valueMapper",
            inputPath: "tracking",
            options: demuxOptions
        },
        method: "assertDeepEq",
        expected: {
            "FollowFocus": true
        }
    }, {
        message: "valueMapper selects mouse by default",
        model: {
            tracking: "unknown-thing"
        }, 
        expander: {
            type: "fluid.model.transform.valueMapper",
            inputPath: "tracking",
            defaultInputValue: "mouse",
            options: demuxOptions
        },
        method: "assertDeepEq",
        expected: {
            "FollowMouse": true
        }
    }, {
        message: "valueMapper with default output value and non-string input value",
        model: {
            condition: true
        }, 
        expander: {
            type: "fluid.model.transform.valueMapper",
            inputPath: "condition",
            defaultOutputValue: "CATTOO",
            options: {
                "true": {
                    outputPath: "trueCATT"
                },
                "false": {
                    outputPath: "falseCATT"
                }
            }
        },
        method: "assertDeepEq",
        expected: {
            "trueCATT": "CATTOO"
        }
    }];
    
    testCase.test("fluid.model.transform.valueMapper()", function () {
        testOneStructure(demultiplexTests);
    });
    
    testCase.test("transform with compact inputPath", function() {
        var rules = {
            feline: "cat",
            kangaroo: {
                value: "literal value"
            },
            "farm.goat": "goat",
            "farm.sheep": "sheep"
        };
        var expected = {
            feline: "meow", // prop rename
            kangaroo: "literal value",
            farm: { // Restructure
                goat: false,
                sheep: [
                    "baaa",
                    "wooooool"
                ]
            }
        };
        var result = fluid.model.transform(source, rules);
        jqUnit.assertDeepEq("The model should be transformed based on the specified rules", expected, result);
    });
    
    testCase.test("transform with nested farm.goat", function() {
        var rules = {
            "farm": {
                "goat": {
                    expander: {
                        type: "fluid.model.transform.value",
                        inputPath: "goat"
                    }
                }
            }
        };
        var expected = {
           farm: { // Restructure
                goat: false,
            }
        };
        var result = fluid.model.transform(source, rules);
        jqUnit.assertDeepEq("The model should be transformed based on the specified rules", expected, result);
    });
    
    
    testCase.test("fluid.model.transform()", function () {
        var rules = {
            // Rename a property
            feline: { 
                expander: {
                    type: "fluid.model.transform.value",
                    inputPath: "cat"
                }
            },

            // Use a default value
            gerbil: {
                expander: {
                    type: "fluid.model.transform.value",
                    inputPath: "gerbil",
                    value: "sold out"
                }
            },

            // Use a literal value
            kangaroo: {
                expander: {
                    type: "fluid.model.transform.value",
                    value: "literal value"
                }
            },

            // Restructuring/nesting
            "farm.goat": {                                          
                expander: {
                    type: "fluid.model.transform.value",
                    inputPath: "goat"
                }
            },
            "farm.sheep": {
                expander: {
                    type: "fluid.model.transform.value",
                    inputPath: "sheep"
                }
            },

            // First value
            "bear": {
                expander: {
                    type: "fluid.model.transform.firstValue",
                    values: [
                        {
                            expander: {
                                type: "fluid.model.transform.value",
                                inputPath: "grizzly"
                            }
                        },
                        {
                            expander: {
                                type: "fluid.model.transform.value",
                                inputPath: "polar"
                            }
                        }
                    ]
                }
            }
        };

        var expected = {
            feline: "meow", // prop rename
            gerbil: "sold out", // default value
            kangaroo: "literal value",
            farm: { // Restructure
                goat: false,
                sheep: [
                    "baaa",
                    "wooooool"
                ]
            },
            bear: "grrr" // first value
        };
        
        var result = fluid.model.transform(source, rules);
        jqUnit.assertDeepEq("The model should transformed based on the specified rules", expected, result);
    });
    
    testCase.test("fluid.model.transform() with idempotent rules", function () {
        var idempotentRules = {
            wheel: {
                expander: {
                    type: "fluid.model.transform.firstValue",
                    values: [
                        {
                            expander: {
                                type: "fluid.model.transform.value",
                                inputPath: "wheel"
                            }
                        },
                        {
                            expander: {
                                type: "fluid.model.transform.value",
                                inputPath: "hamster.wheel"
                            }
                        }
                    ]
                }
            },
            "barn.cat": {
                expander: {
                    type: "fluid.model.transform.firstValue",
                    values: [
                        {
                            expander: {
                                type: "fluid.model.transform.value",
                                inputPath: "barn.cat"
                            }
                        },
                        {
                            expander: {
                                type: "fluid.model.transform.value",
                                inputPath: "cat"
                            }
                        }
                    ]
                }
            }
        };
        
        var expected = {
            wheel: "spin",
            barn: {
                cat: "meow"
            }
        };
        
        var result = fluid.model.transform(source, idempotentRules);
        
        // Test idempotency of the transform (with these particular rules).
        result = fluid.model.transform(fluid.copy(result), idempotentRules);
        jqUnit.assertDeepEq("Running the transform on the output of itself shouldn't mangle the result.",
                            expected, result);
                            
        // Test that a model that already matches the rules isn't mangled by the transform (with these particular rules).
        result = fluid.model.transform(fluid.copy(expected), idempotentRules);
        jqUnit.assertDeepEq("With the appropriate rules, a model that already matches the transformation rules should pass through successfully.",
                            expected, result);
    });
    
    var oldOptions = {
        cat: {
            type: "farm.cat"
        },
        numFish: 2
    };
    
    var modernOptions = {
        components: {
            cat: {
                type: "farm.cat"
            },
            fish: {
                type: "bowl.fish",
                options: {
                    quantity: 2
                }
            }
        }
    };
    
    var transformRules = {
        "components.cat": "cat",
        "components.fish.type": {
            expander: {
                type: "fluid.model.transform.value",
                value: "bowl.fish"
            }
        },
        "components.fish.options.quantity": "numFish",
        "food": "food"
    };

    var checkTransformedOptions = function (that) {
        var expected = fluid.merge(null, fluid.copy(fluid.rawDefaults(that.typeName)), modernOptions);
        fluid.testUtils.assertLeftHand("Options sucessfully transformed", expected, that.options);
    };
    
    testCase.test("fluid.model.transform(): options backwards compatibility", function () {
        var result = fluid.model.transform(oldOptions, transformRules);
        deepEqual(result, modernOptions, "Options should be transformed successfully based on the provided rules.");
    });
    
    fluid.registerNamespace("fluid.tests.transform");
        
    fluid.defaults("fluid.tests.testTransformable", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        food: "tofu"
    });
    
    fluid.makeComponents({
        "farm.cat": "fluid.littleComponent",
        "bowl.fish": "fluid.littleComponent"
    });
    
    testCase.test("fluid.model.transform applied automatically to component options, without IoC", function () {
        var options = fluid.copy(oldOptions);
        options.transformOptions = {
            transformer: "fluid.model.transform",
            config: transformRules  
        };
        var that = fluid.tests.testTransformable(options);
        checkTransformedOptions(that);
    });
    
    fluid.demands("fluid.transformOptions", ["fluid.tests.testTransformableIoC", "fluid.tests.transform.version.old"], {
        options: {
            transformer: "fluid.model.transform",
            config: transformRules
        }
    });

    fluid.defaults("fluid.tests.transform.strategy", {
        gradeNames: ["fluid.littleComponent", "autoInit"]
    });
    
    fluid.defaults("fluid.tests.testTransformableIoC", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        components: {
            strategy: {
                type: "fluid.tests.transform.strategy"
            }
        }
    });
    
    fluid.defaults("fluid.tests.transform.tip", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        components: {
            versionTag: {
                type: "fluid.typeFount",
                options: {
                    targetTypeName: "fluid.tests.transform.version.old"
                }  
            },
            transformable: {
                type: "fluid.tests.testTransformableIoC",
                options: oldOptions
            }  
        }
    });
    
    testCase.test("fluid.model.transform applied automatically to component options, with IoC", function () {
        var that = fluid.tests.transform.tip();
        checkTransformedOptions(that.transformable);
    });
}
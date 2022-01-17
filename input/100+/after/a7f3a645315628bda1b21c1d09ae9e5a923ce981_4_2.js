function (errors, result) {
                var expected_errors = [
                    [ "TemplateLoadingError", "NOT FOUND" ],
                    [ "TemplateLoadingError", "ERROR INITIALIZING broken2" ],
                    [ "TemplateExecutionError", "ERROR EXECUTING broken3" ]
                ];
                
                test.ok(errors, "There should be errors");

                for (var idx=0; idx<errors.length; idx++) {
                    test.equal(errors[idx].name, expected_errors[idx][0]);
                    test.ok(errors[idx].message.indexOf(expected_errors[idx][1]) !== -1);
                }

                // Note: This is a *bit* brittle, but it makes sure the error
                // indicator appears at the expected spot in the context lines
                // included in the message.
                test.equal(295, errors[2].message.indexOf('---------------------^'));

                var expected_events = [
                    [ 'start', null ],
                    [ 'templateLoadStart', 'MacroUsingParams' ],
                    [ 'templateLoadEnd', 'MacroUsingParams' ],
                    [ 'templateLoadStart', 'broken1' ],
                    [ 'error', 'TemplateLoadingError' ],
                    [ 'templateLoadStart', 'broken3' ],
                    [ 'templateLoadEnd', 'broken3' ],
                    [ 'templateLoadStart', 'broken2' ],
                    [ 'error', 'TemplateLoadingError' ],
                    [ 'templateLoadStart', 'AnotherFoundMacro' ],
                    [ 'templateLoadEnd', 'AnotherFoundMacro' ],
                    [ 'macroStart', 'MacroUsingParams' ],
                    [ 'macroEnd', 'MacroUsingParams' ],
                    [ 'macroStart', 'broken1' ],
                    [ 'macroStart', 'broken3' ],
                    [ 'error', 'TemplateExecutionError' ],
                    [ 'macroStart', 'broken2' ],
                    [ 'macroStart', 'AnotherFoundMacro' ],
                    [ 'macroEnd', 'AnotherFoundMacro' ],
                    [ 'end', null ]
                ];
                test.ok(expected_events.length == events.length);
                for (var idx=0; idx<events.length; idx++) {
                    test.equal(events[idx][0], expected_events[idx][0]);
                    test.equal(events[idx][1], expected_events[idx][1]);
                }

                test.done();
            }
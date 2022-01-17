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

                test.done();
            }
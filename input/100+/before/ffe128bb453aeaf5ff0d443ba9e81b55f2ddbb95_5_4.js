function (test) {

        var JSONifyTemplate = ks_test_utils.JSONifyTemplate;

        var BrokenCompilationTemplate = ks_utils.Class(ks_templates.BaseTemplate, {
            initialize: function (options) {
                throw new Error("ERROR INITIALIZING " + this.options.name);
            }
        });
        
        var BrokenExecutionTemplate = ks_utils.Class(ks_templates.BaseTemplate, {
            execute: function (args, ctx, next) {
                throw new Error("ERROR EXECUTING " + this.options.name);
            }
        });
        
        var LocalClassLoader = ks_utils.Class(ks_loaders.BaseLoader, {
            load: function (name, cb) {
                if (!this.options.templates[name]) {
                    cb('NOT FOUND', null);
                } else {
                    cb(null, name);
                }
            },
            compile: function (name, cb) {
                var cls = (name in this.options.templates) ?
                    this.options.templates[name] :
                    JSONifyTemplate;
                try {
                    cb(null, new cls({ name: name }));
                } catch (e) {
                    cb(e, null);
                }
            }
        });
        
        var mp = new ks_macros.MacroProcessor({
            loader_class: LocalClassLoader,
            loader_options: {
                templates: {
                    'broken1': null,
                    'broken2': BrokenCompilationTemplate,
                    'broken3': BrokenExecutionTemplate,
                    'MacroUsingParams': JSONifyTemplate,
                    'AnotherFoundMacro': JSONifyTemplate
                }
            }
        });

        var events = [],
            event_names = ['start', 'end', 'error', 
                           'templateLoadStart', 'templateLoadEnd',
                           'macroStart', 'macroEnd'];
        _(event_names).each(function (name, idx) {
            mp.on(name, function (m) {
                events.push([name, (m && 'name' in m) ? m.name : null]);
            });
        });

        processFixture(test, mp, 'macros-broken-templates.txt',
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
        );

    }
function (test) {
        var load_count = 0,
            exec_count = 0;
        var CounterTemplate = ks_utils.Class(ks_templates.BaseTemplate, {
            execute: function (args, ctx, next) {
                exec_count++;
                next(null, args[0] + '=' + exec_count + '/' + load_count);
            }
        });
        var CounterTemplateLoader = ks_utils.Class(ks_loaders.BaseLoader, {
            load: function (name, cb) {
                load_count++;
                cb(null, new CounterTemplate());
            },
            compile: function (obj, cb) {
                cb(null, obj);
            }
        });
        var mp = new ks_macros.MacroProcessor({
            macro_timeout: 500,
            loader_class: CounterTemplateLoader
        });
        processFixture(test, mp, 'macros-repeated-macros.txt',
            function (errors, result) {
                test.equal(3, exec_count);
                test.equal(1, load_count);
                test.done();
            }
        );
    }
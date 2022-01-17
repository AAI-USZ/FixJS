function() {
        var check,
            files,
            filter,
            source,
            i,
            l;

        // check all .js files unless they're tests; rhino shim files that probably can't be
        // delinted; or third-party modules
        source = {
            includePattern: ".+\\.js$",
            excludePattern: ".+[\\\\|/]test[\\\\|/].+|.+rhino-shim\\.js|.+[\\\\|/]Jake[\\\\|/].+|.+[\\\\|/]node_modules[\\\\|/].+"
        };
        filter = new (require('jsdoc/src/filter').Filter)(source);

        files = app.jsdoc.scanner.scan([env.dirname], 10, filter);

        check = function() {
            jsHintCheck(files[i]);
        };

        for (i = 0, l = files.length; i < l; i++) {
            expect(check).not.toThrow();
        }
    }
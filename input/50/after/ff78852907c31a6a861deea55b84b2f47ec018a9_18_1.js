function() {
        env.opts._ = [env.dirname + '/test/fixtures/modules/'];
        srcParser = new parser.Parser();
        require('jsdoc/src/handlers').attachTo(srcParser);
    }
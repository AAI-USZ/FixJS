function() {
        env.opts._ = [__dirname + '/test/fixtures/modules/'];
        srcParser = new parser.Parser();
        require('jsdoc/src/handlers').attachTo(srcParser);
    }
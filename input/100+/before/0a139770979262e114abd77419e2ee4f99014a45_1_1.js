function Mustachio(argv) {
    this.argv = Y.merge(arg.defaults, argv);

    // no _ args means we skipped CLI checks
    if (!this.argv.hasOwnProperty('_')) {
        arg.checkFlags(this.argv);
    }

    this.known = {};
    this.output = [];
    this.prefix = (this.argv.modulePrefix + '-').replace('--', '-');
    this.pregex = new RegExp('"(' + this.prefix + '[\\w\\-]+)"');

    this.namespace = this.argv.moduleNamespace;
    this.template = this.argv.moduleTemplate;

    if (this.argv.verbose) {
        this.log = function () {
            console.log.apply(null, arguments);
        };
    }

    if (this.argv.min) {
        this._render = function (ary) {
            return uglify(ary.join('')) + ';\n';
        };
    }
    else if (this.argv.beautify) {
        this._render = function (ary) {
            var code = ary.join(''),
                ast = uglify.parser.parse(code);
            // ast = uglify.uglify.ast_mangle(ast);
            // ast = uglify.uglify.ast_squeeze(ast);
            return uglify.uglify.gen_code(ast, {
                beautify: true
            }) + '\n';
        };
    }

    // Convert the known list into a hash
    if (this.argv.known && !Array.isArray(this.argv.known)) {
        this.argv.known = [this.argv.known];
    }
    if (this.argv.known) {
        var i = 0, len = this.argv.known.length;
        for (; i < len; i += 1) {
            this.known[this.argv.known[i]] = true;
        }
    }

    this._initModuleTemplate();

    if (this.argv._ && this.argv._.length) {
        this.invoke(this.argv._);
    }
}
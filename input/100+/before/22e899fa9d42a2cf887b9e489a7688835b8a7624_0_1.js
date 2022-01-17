function main() {
    var sourceFiles,
        packageJson,
        docs,
        jsdoc = {
            opts: {
                parser: require('jsdoc/opts/parser'),
            }
        },
        resolver,
        fs = require('fs'),
        Config = require('jsdoc/config');

    env.opts = jsdoc.opts.parser.parse(env.args);

    try {
        env.conf = new Config( fs.readFileSync( env.opts.configure || __dirname + '/conf.json' ) ).get();
    }
    catch (e) {
        try {
            //Try to copy over the example conf
            var example = fs.readFileSync(__dirname + '/conf.json.EXAMPLE', 'utf8');
            fs.writeFileSync(__dirname + '/conf.json', example, 'utf8');
            env.conf = JSON.parse(example);
        }
        catch(e) {
            throw('Configuration file cannot be evaluated. ' + e);
        }
    }

    // allow to pass arguments from configuration file
    if (env.conf.opts) {
        for (var opt in env.conf.opts) {
            // arguments passed in command are more important
            if (!(opt in env.opts)) {
                env.opts[opt] = env.conf.opts[opt];
            }
        }
        // command file list is concatenated after conf list
        if( env.conf.opts._ ){
            env.opts._ = env.conf.opts._.concat( env.opts._ );
        }
    }

    if (env.opts.query) {
        env.opts.query = require('common/query').toObject(env.opts.query);
    }

    // which version of javascript will be supported? (rhino only)
    if (typeof version === 'function') {
        version(env.conf.jsVersion || 180);
    }

    if (env.opts.help) {
        console.log( jsdoc.opts.parser.help() );
        exit(0);
    } else if (env.opts.test) {
        include('test/runner.js');
        exit(0);
    }

    if (env.conf.plugins) {
        installPlugins(env.conf.plugins);
    }

    // any source file named package.json or README.md is treated special
    for (var i = 0, l = env.opts._.length; i < l; i++ ) {
        if (/\bpackage\.json$/i.test(env.opts._[i])) {
            packageJson = require('fs').readFileSync( env.opts._[i] );
            env.opts._.splice(i--, 1);
        }
        
        if (/(\bREADME|\.md)$/i.test(env.opts._[i])) {
            var readme = require('jsdoc/readme');
            env.opts.readme = new readme(env.opts._[i]).html;
            env.opts._.splice(i--, 1);
        }
    }
    
    if (env.conf.source && env.conf.source.include) {
        env.opts._ = (env.opts._ || []).concat(env.conf.source.include);
    }
    
    if (env.conf.source && env.opts._.length > 0) { // are there any files to scan and parse?
        var filter = new (require('jsdoc/src/filter').Filter)(env.conf.source);

        sourceFiles = app.jsdoc.scanner.scan(env.opts._, (env.opts.recurse? 10 : undefined), filter);

        require('jsdoc/src/handlers').attachTo(app.jsdoc.parser);

        docs = app.jsdoc.parser.parse(sourceFiles, env.opts.encoding);

        //The files are ALWAYS useful for the templates to have
        //If there is no package.json, just create an empty package
        var packageDocs = new (require('jsdoc/package').Package)(packageJson);
        packageDocs.files = sourceFiles || [];
        docs.push(packageDocs);

        function indexAll(docs) {
            var lookupTable = {},
                hasOwnProperty = Object.prototype.hasOwnProperty;

            docs.forEach(function(doc) {
                if ( !hasOwnProperty.call(lookupTable, doc.longname) ) {
                    lookupTable[doc.longname] = [];
                }
                lookupTable[doc.longname].push(doc);
            });
            docs.index = lookupTable;
        }

        indexAll(docs);

        require('jsdoc/augment').addInherited(docs);
        require('jsdoc/borrow').resolveBorrows(docs);

        if (env.opts.explain) {
            console.log(docs);
            exit(0);
        }

        // load this module anyway to ensure root instance exists
        // it's not a problem since without tutorials root node will have empty children list
        resolver = require('jsdoc/tutorial/resolver');

        if (env.opts.tutorials) {
            resolver.load(env.opts.tutorials);
            resolver.resolve();
        }

        env.opts.template = env.opts.template || 'templates/default';

        // should define a global "publish" function
        include(env.opts.template + '/publish.js');

        if (typeof publish === 'function') {
            publish(
                new (require('typicaljoe/taffy'))(docs),
                env.opts,
                resolver.root
            );
        }
        else { // TODO throw no publish warning?
        }
    }
}
function init () {
    var name;
    // if this is the top level module and no args were provided, treat it
    // like a cry for help
    !module.parent && config.args.length == 2 && config.args.push('-h');
    options = config.options || argparse(config.argSchema)(config.args);

    name = options.index.split('/').pop();
    if (name.indexOf('.js') + 3 == name.length)
        name = name.slice(0, -3);

    // root of tree
    mainModule = new Mod(name);

    mainModule.load(path.resolve(__dirname, options.index), name);
    output = mainModule.build();

options.v && each(mainModule._mods, function (val, key) {
        console.log(key);
        each(val, function (val, key) {
            console.log('  - ', key)
        })
    })

    if (options.es3) {
        // do something to the ast
    }

// TEMPORARY HACK
var left = '(function (global, undef) {\n',
    right = '\n}(this));';

    if (options.saveAs) {
        fs.writeFileSync(options.saveAs, left + output.src + right, 'utf8');
    }

}
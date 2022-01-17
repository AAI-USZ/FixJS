function(_options) {
    options = _options;

    if (options.new) {
        utils.createStructure(path.join(options.path));
        utils.log('success', utils.colorize('blue', 'Glue ') + utils.colorize('green', 'created ') + path.join(currentDir, options.path));
        if (!options.watch) process.exit(0);
    }

    srcDir = options.path !== currentDir ? path.join(currentDir, options.path, 'src') : path.join(currentDir, 'src');
    srcCSS = path.join(srcDir, 'main.css');

    buildDir = options.path !== currentDir ? path.join(currentDir, options.path, 'build') : path.join(currentDir, 'build');
    buildCSS = path.join(buildDir, 'main.css')


    if (!fs.existsSync(srcDir)) {
        utils.log('error', utils.colorize('red', 'Couldn\'t find directory: ' + srcDir));
        process.exit(1);
    }

    if (!fs.existsSync(srcCSS)) {
        utils.log('error', utils.colorize('red', 'Couldn\'t find the main.css file.'));
        process.exit(1);
    }

    // If nothing went wrong then start the gluing process
    fs.readFile(srcCSS, 'utf8', function(error, css) {
        if (error) {
            utils.log('error', utils.colorize('red', 'There was a problem while reading the file. \n Please try again.'));
            process.exit(1);
        }

        if (firstTime) console.log('');

        if (options.watch) {
            utils.log('success', utils.colorize('blue', 'Glue ') + 'is ' + utils.colorize('green', 'watching ') + 'main.css');
            watchFile(srcCSS);
            watched.push('main.css');
        }

        code.original = css;
        findImports(code.original);
    });
}
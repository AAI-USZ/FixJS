function createFiles() {
    if (firstTime) console.log('');

    if (!path.existsSync(buildDir)) fs.mkdirSync('build');

    fs.writeFileSync(buildCSS, code.glued, 'utf8');
    utils.log('success', utils.colorize('blue', 'Glue ') + utils.colorize('green', firstTime ? 'created' : 'updated') + ' build/main.css');

    if (options.mini) {
        code.gluedMini = cleanCSS.process(code.glued); // Minify glued CSS
        fs.writeFileSync(path.join(buildDir, 'main.min.css'), code.gluedMini, 'utf8');
        utils.log('success', utils.colorize('blue', 'Glue ') + utils.colorize('green', firstTime ? 'created' : 'updated') + ' build/main.min.css');
    }
}
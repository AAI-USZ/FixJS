function (_path) {
    var src, build;
    _path = _path || process.cwd();
    src = path.join(_path, 'src');
    build = path.join(_path, 'build');

    if (!path.existsSync(_path)) fs.mkdirSync(_path);
    if (!path.existsSync(src)) fs.mkdirSync(src);
    if (!path.existsSync(path.join(src, 'modules'))) fs.mkdirSync(path.join(src, 'modules'));
    if (!path.existsSync(build)) fs.mkdirSync(build);

    fs.writeFileSync(
        path.join(src, 'main.css'),
        '/* CSS Reset */ \n @import url(\'reset.css\'); \n\n /* Base Styles */ \n @import url(\'base.css\'); \n\n /* Layout Styles */ \n @import url(\'layout.css\'); \n\n /* Modules */ \n @import url(\'modules/module.css\'); \n\n /* Module States */ \n @import url(\'states.css\'); \n\n /* Helper Classes */ \n @import url(\'helpers.css\');',
        'utf8'
    );

    fs.writeFileSync(path.join(src, 'reset.css'), '', 'utf8');
    fs.writeFileSync(path.join(src, 'base.css'), '', 'utf8');
    fs.writeFileSync(path.join(src, 'layout.css'), '', 'utf8');
    fs.writeFileSync(path.join(src, 'states.css'), '', 'utf8');
    fs.writeFileSync(path.join(src, 'modules/module.css'), '', 'utf8');
    fs.writeFileSync(path.join(src, 'helpers.css'), '', 'utf8');
}
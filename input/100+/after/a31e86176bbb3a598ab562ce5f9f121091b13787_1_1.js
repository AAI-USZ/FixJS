function addFileToAstList (filePath, wrap) {
    state.required[filePath] = state.requiredCount++;
    var oldPath = state.currentPath;
    state.currentPath = filePath;
    var text = fs.readFileSync(filePath, 'utf8');
    // remove shebang
    text = text.replace(/^\#\!.*/, '');
    var ast;
    if (text.indexOf('@static_require noprocess') === -1) {
        if (wrap) {
            text = 
                '(function(global, module, require) {' + 
                '"' + filePath + '";' +
                'var exports = this;' + text + '})';
        }
        ast = jsp.parse(text);
        ast = walker.with_walkers(walkers, function() {
            return walker.walk(ast);
        });
    } else {
        if (wrap) {
            text = '(function() {' + text + '})';
        }
        ast = jsp.parse(text);
    }
    state.currentPath = oldPath;
    state.requiredAsts[state.required[filePath]] = ast;
}
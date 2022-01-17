function detectIndent(mod, lines) {
    var moduleBodyStartLine = mod.body.loc.start.line - 1;
    var line = lines[moduleBodyStartLine + 1];
    if (line) {
        var m = line.match(/^(\s*)\S/);
        if (m) {
            return m[1];
        }
    }
    return '';
}
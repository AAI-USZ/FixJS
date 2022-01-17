function detectIndent(mod, lines) {
    var i = 0;
    while (i < lines.length) {
        var line = lines[i];
        var m = line.match(/^(\s+)\S/);
        if (m) {
            return m[1];
        }
        i++;
    }
    return '';
}
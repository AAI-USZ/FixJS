function(path, suffix, vars) {
    var bemhtmlFile = vars.Prefix + '.bemhtml.js',
        bemjsonFile = vars.Prefix + '.bemjson.js';

    VM.runInThisContext(FS.readFileSync(bemhtmlFile, 'utf-8'));
    return BEMHTML.apply(VM.runInThisContext(FS.readFileSync(bemjsonFile, 'utf-8')));
}
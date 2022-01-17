function (path, imports, features, once, index) {
    var that = this;

    this.once = once;
    this.index = index;
    this._path = path;
    this.features = features && new(tree.Value)(features);

    // The '.less' extension is optional
    if (path instanceof tree.Quoted) {
        this.path = /\.(le?|c)ss(\?.*)?$/.test(path.value) ? path.value : path.value + '.less';
    } else {
        this.path = path.value.value || path.value;
    }

    this.css = /css(\?.*)?$/.test(this.path);

    // Only pre-compile .less files
    if (! this.css) {
        imports.push(this.path, function (e, root, imported) {
            if (e) { e.index = index }
            if (imported && that.once) that.skip = imported;
            that.root = root || new(tree.Ruleset)([], []);
        });

    // Ensure CSS files are imported relative to the LESS file, not the HTML
    // file, in browsers
    } else if (typeof window !== 'undefined' && !/^[a-z][a-z0-9+.-]*:/i.test(this.path)) {
        this.path = imports.paths[0] + this.path;
    }
}
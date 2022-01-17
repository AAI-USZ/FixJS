function (t) {
    t.plan(1);
    var src = browserify({ exports : [ 'require', 'process' ] })
        .addEntry(__dirname + '/export/entry.js')
        .bundle()
    ;
    var c = {};
    vm.runInNewContext(src, c);
    t.same(Object.keys(c).sort(), [ 'require', 'process' ].sort());
}
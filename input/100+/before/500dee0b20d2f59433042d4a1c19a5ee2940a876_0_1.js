function (t) {
    t.plan(2);
    
    var src = browserify.bundle(__dirname + '/entry/main.js');
    
    var c = {
        setTimeout : process.nextTick,
        done : function (one, two) {
            t.equal(one, 1);
            t.equal(two, 2);
            t.end();
        }
    };
    vm.runInNewContext(src, c);
    
    t.deepEqual(
        Object.keys(c.require.modules).sort(),
        [ 'path', '/one.js', '/two.js', '/main.js' ].sort()
    );
}
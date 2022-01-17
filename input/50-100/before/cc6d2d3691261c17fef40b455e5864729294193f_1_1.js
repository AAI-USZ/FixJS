function (code) {
        t.equal(code, 0);
        
        var allDone = false;
        var c = {
            done : function () { allDone = true }
        };
        
        vm.runInNewContext(src, c);
        t.deepEqual(
            [ 'path', '__browserify_process', '/one.js', '/two.js', '/main.js' ].sort(),
            Object.keys(c.require.modules).sort()
        );
        t.ok(allDone);
        
        t.end();
    }
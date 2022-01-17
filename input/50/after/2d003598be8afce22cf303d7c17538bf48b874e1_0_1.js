function (code) {
        t.equal(code, 0);
        
        var c = {};
        vm.runInNewContext(src, c);
        t.equal(c.require('beep'), 'boop');
    }
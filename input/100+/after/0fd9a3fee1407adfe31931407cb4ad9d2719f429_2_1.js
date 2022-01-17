function() {
        /*jshint evil: true */
        var lenient = !!env.opts.lenient,
            log = eval(console.log);
        console.log = function() {};
        
        env.opts.lenient = true;
        expect(badTag).not.toThrow();
        
        env.opts.lenient = lenient;
        console.log = log;
    }
function() {
        var lenient = !!env.opts.lenient;
        
        env.opts.lenient = false;
        expect(badTag).toThrow();
        
        env.opts.lenient = lenient;
    }
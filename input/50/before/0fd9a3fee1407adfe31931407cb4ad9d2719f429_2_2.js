function() {
        var strict = !!env.opts.strict;
        
        env.opts.strict = true;
        
        expect(badTag).toThrow();
        
        env.opts.strict = strict;
    }
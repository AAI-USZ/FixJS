function (selector, context) {
        var results = [];

        baidu.each ( this, function(dom) {
            var t = [dom];
            while ( dom = dom.parentNode ) {
                dom.nodeType && t.push( dom );
            }
            t = baidu.dom.match( t, selector, context );

            t.length && results.push(t[0]);
        });
        results = baidu.array(results).unique();
        
        return baidu.dom(results);
    }
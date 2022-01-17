function() {
        try {
            require('./thrower').fn();
        } catch (e) {
            e.stack.should.match(/^Error: fn\n *at .*thrower\.js:2/);
        }
    }
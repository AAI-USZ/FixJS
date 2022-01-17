function() {
        try {
            require('./not_found').requireNonExistent();
        } catch (e) {
            e.stack.should.match(/\n *at .*not_found\.js:2\n/);
        }
    }
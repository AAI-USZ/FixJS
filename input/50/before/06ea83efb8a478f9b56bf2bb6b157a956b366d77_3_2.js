function() {
        console.log("sample_ev1");
        ++counter;

        assert.equal(counter, 2, "[" + event + "]sample_ev1 error [" + counter + "] ");
    }
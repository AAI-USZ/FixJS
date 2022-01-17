function() {
        console.log("sample_ev2");
        ++counter;

        assert.equal(counter, 3, "[" + event + "]sample_ev2 error [" + counter + "] ");
    }
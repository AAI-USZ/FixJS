function() {
        console.log("the end");
        assert.equal(counter, ev_counter, "done count vs counter");
        assert.equal(counter, works, "works count vs counter");
    }
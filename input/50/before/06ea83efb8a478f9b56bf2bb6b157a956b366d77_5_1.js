function() {
            console.log("sequence_1");
            ++counter;
            assert.equal(counter, 1, "sequence_1 error [" + counter + "] ");
            work.done();
        }
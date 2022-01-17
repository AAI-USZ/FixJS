function() {
            console.log("sequence_2");
            ++counter;
            assert.equal(counter, 2, "sequence_2 error [" + counter + "] ");
            work.done();
        }
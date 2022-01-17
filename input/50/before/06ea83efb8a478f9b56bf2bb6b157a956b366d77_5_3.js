function() {
            console.log("sequence_3");
            ++counter;
            assert.equal(counter, 3, "sequence_3 error [" + counter + "] ");
            work.done("i send you this!");
        }
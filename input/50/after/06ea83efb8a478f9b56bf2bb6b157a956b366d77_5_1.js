function() {
            ++counter;
            t.equal(counter, 1, "sequence_1 error [" + counter + "] ");
            work.done();
        }
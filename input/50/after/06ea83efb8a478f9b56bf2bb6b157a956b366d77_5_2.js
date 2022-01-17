function() {
            ++counter;
            t.equal(counter, 2, "sequence_2 error [" + counter + "] ");
            work.done();
        }
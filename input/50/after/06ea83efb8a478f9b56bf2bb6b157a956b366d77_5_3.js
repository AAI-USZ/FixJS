function() {
            ++counter;
            t.equal(counter, 3, "sequence_3 error [" + counter + "] ");
            work.done("i send you this!");
        }
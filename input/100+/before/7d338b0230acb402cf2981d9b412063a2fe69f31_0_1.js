function(error, res, more) {
        test.ifError(error);

        if(nextExpected == 1000) {
            test.equal(res, undefined);
            test.equal(more, false);
            test.done();
        } else {
            test.equal(res, nextExpected);
            test.equal(more, true);
            nextExpected += 1;
        }
    }
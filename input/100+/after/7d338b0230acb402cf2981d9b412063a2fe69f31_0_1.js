function(error, res, more) {
        test.ifError(error);

        test.equal(typeof(res.name), "string");
        test.equal(_.keys(res.methods).length, 2);

        for(var key in res.methods) {
            test.equal(res.methods[key].doc, "");
        }

        test.deepEqual(res.methods.add42.args.length, 1);
        test.deepEqual(res.methods.add42.args[0].name, "n");
        test.equal(more, false);
        test.done();
    }
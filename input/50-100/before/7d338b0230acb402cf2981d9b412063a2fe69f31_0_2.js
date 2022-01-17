function(test) {
    test.expect(3);

    rpcClient.invoke("quiet", function(error, res, more) {
        test.equal(error.name, "TimeoutExpired");
        test.equal(res, null);
        test.equal(more, false);
        test.done();
    });
}
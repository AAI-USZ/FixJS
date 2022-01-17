function(test) {
    test.expect(3);

    var badRpcClient = new zerorpc.Client();
    badRpcClient.connect("tcp://localhost:4040");

    badRpcClient.invoke("add42", 30, function(error, res, more) {
        test.ok(error);
        test.equal(res, null);
        test.equal(more, false);
        test.done();
    });
}
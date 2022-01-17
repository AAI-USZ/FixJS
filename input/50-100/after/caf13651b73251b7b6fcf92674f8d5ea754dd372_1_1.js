function checkPageCallback(page) {
    it("should pass variables from/to window.callPhantom/page.onCallback", function() {
        var msgA = "a",
            msgB = "b",
            result,
            expected = msgA + msgB;
        page.onCallback = function(a, b) {
            return a + b;
        };
        result = page.evaluate(function(a, b) {
            return callPhantom(a, b);
        }, msgA, msgB);

        expect(result).toEqual(expected);
    });
}
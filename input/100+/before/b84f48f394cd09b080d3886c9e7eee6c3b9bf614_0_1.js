function() {
    function TestDivBuilder() {
    }
    var p = TestDivBuilder.prototype;
    TestDivBuilder.Colors = ['red', 'green', 'blue', 'yellow'];
    p.BuildColoredBoxes = function () {
        var jqBody = $(document.body);
        jqBody.empty();
        var builder = new Application.DivBuilder();
        for(var i = 0; i < UnitTests.TestDivBuilder.Colors.length; i++) {
            builder.CreateBox(UnitTests.TestDivBuilder.Colors[i], 100);
        }
        Blade.Assert.AreEqual(4, jqBody.children().length);
    }
    return TestDivBuilder;
}
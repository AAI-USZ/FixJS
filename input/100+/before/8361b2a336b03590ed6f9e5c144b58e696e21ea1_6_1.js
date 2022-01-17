function() {
    var finish;
    var valueOf;
    var Cloud;
    this.init = function(testUtils) {
        finish = testUtils.finish;
        valueOf = testUtils.valueOf;
        Cloud = require('ti.cloud');
    };
    this.name = "cloud emails";
    this.tests = [
        {name: "Api"},
        {name: "Send", timeout:30000}
    ];

    function verifyAPIs(testRun, namespace, functions) {
        for (var i = 0; i < functions.length; i++) {
            valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
        }
    };

    // ---------------------------------------------------------------
    // Cloud.Emails
    // ---------------------------------------------------------------

    // Test that all of the namespace APIs are available
    this.Api= function(testRun) {
        // Verify that all of the methods are exposed
        verifyAPIs(testRun, 'Emails', [
            'send'
        ]);
        finish(testRun);
    },

    this.Send= function(testRun) {
        var data = {
            template: 'DrillbitTest',
            name: 'John Smith',
            subject: 'cloudEmailsSend Drillbit test',
            recipients: 'joe@smith.com',
            from: 'test@appcelerator.com'
        };
        Cloud.Emails.send(data, function(e) {
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            valueOf(testRun, e.code).shouldBe(422);
            finish(testRun);
        });
    }
}
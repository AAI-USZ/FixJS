function() {
    var finish;
    var valueOf;
    var Cloud;
    this.init = function(testUtils) {
        finish = testUtils.finish;
        valueOf = testUtils.valueOf;
        Cloud = require('ti.cloud');
    };

    this.name = "cloud clients";
    this.tests = [
        {name: "Api"},
        {name: "Locate", timeout: 30000},
        {name: "LocateAppcelerator", timeout: 30000}
    ];

    function verifyAPIs(testRun, namespace, functions) {
        for (var i = 0; i < functions.length; i++) {
            valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
        }
    }

    // ---------------------------------------------------------------
    // Cloud.Clients
    // ---------------------------------------------------------------

    // Test that all of the namespace APIs are available
    this.Api= function(testRun) {
        // Verify that all of the methods are exposed
        verifyAPIs(testRun, 'Clients', [
            'geolocate'
        ]);
        finish(testRun);
    };

    this.Locate= function(testRun) {
        Cloud.Clients.geolocate(function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            finish(testRun);
        });
    };

    this.LocateAppcelerator= function(testRun) {
        var data = {
            ip_address: '184.72.37.109'
        };
        Cloud.Clients.geolocate(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.ip_address).shouldBe('184.72.37.109');
            valueOf(testRun, e.location.city).shouldBe('San Jose');
            finish(testRun);
        });
    };
}
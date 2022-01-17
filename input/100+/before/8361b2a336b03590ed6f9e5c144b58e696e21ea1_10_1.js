function() {
    var finish;
    var valueOf;
    var Cloud;
    this.init = function(testUtils) {
        finish = testUtils.finish;
        valueOf = testUtils.valueOf;
        Cloud = require('ti.cloud');
    };

    this.name = "cloud key values";
    this.tests = [
        {name: "Api"},
        {name: "LoginDrillbitUser", timeout: 30000},
        {name: "SetMultiple", timeout: 30000},
        {name: "Get", timeout: 30000},
        {name: "Append", timeout: 30000},
        {name: "Increment", timeout: 30000},
        {name: "DeleteAll", timeout: 30000},
        {name: "LogoutDrillbitUser", timeout: 30000}
    ];

    function verifyAPIs(testRun, namespace, functions) {
        for (var i = 0; i < functions.length; i++) {
            valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
        }
    };

    var drillbitUserId;

    // ---------------------------------------------------------------
    // Cloud.KeyValues
    // ---------------------------------------------------------------

    // Test that all of the namespace APIs are available
    this.Api= function(testRun) {
        // Verify that all of the methods are exposed
        verifyAPIs(testRun, 'KeyValues', [
            'set',
            'get',
            'append',
            'increment',
            'remove'
        ]);
        finish(testRun);
    },

    // Log in for the following tests
    this.LoginDrillbitUser = function(testRun) {
        var data = {
            login: 'drillbitUser',
            password: 'password'
        };
        Cloud.Users.login(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            drillbitUserId = e.users[0].id;
            finish(testRun);
        });
    },

    this.SetMultiple = function(testRun) {
        var set1 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            Cloud.KeyValues.set({
                name: 'test2',
                value: '100'
            }, set2)
        };

        var set2 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            Cloud.KeyValues.set({
                name: 'test3',
                value: 'Hello'
            }, set3)
        };

        var set3 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            finish(testRun);
        };

        Cloud.KeyValues.set({
            name: 'test1',
            value: 'Hello World'
        }, set1);
    },

    this.Get = function(testRun) {
        var data = {
            name: 'test1'
        };
        Cloud.KeyValues.get(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.keyvalues.length).shouldBe(1);
            valueOf(testRun, e.keyvalues[0].name).shouldBe('test1');
            valueOf(testRun, e.keyvalues[0].value).shouldBe('Hello World');
            finish(testRun);
        });
    },

    this.Append = function(testRun) {
        var data = {
            name: 'test3',
            value: ', Drillbit'
        };
        Cloud.KeyValues.append(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.keyvalues.length).shouldBe(1);
            valueOf(testRun, e.keyvalues[0].name).shouldBe('test3');
            valueOf(testRun, e.keyvalues[0].value).shouldBe('Hello, Drillbit');
            finish(testRun);
        });
    },

    this.Increment = function(testRun) {
        var data = {
            name: 'test2',
            value: 10
        };
        Cloud.KeyValues.increment(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.keyvalues.length).shouldBe(1);
            valueOf(testRun, e.keyvalues[0].name).shouldBe('test2');
            valueOf(testRun, e.keyvalues[0].value).shouldBe(110);
            finish(testRun);
        });
    },

    this.DeleteAll = function(testRun) {
        var remove1 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            Cloud.KeyValues.remove({ name: 'test2' }, remove2);
        };

        var remove2 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            Cloud.KeyValues.remove({ name: 'test3' }, remove3);
        };

        var remove3 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            Cloud.KeyValues.get({ name: 'test1' }, get1);
        };

        var get1 = function(e) {
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            Cloud.KeyValues.get({ name: 'test2' }, get2);
        };

        var get2 = function(e) {
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            Cloud.KeyValues.get({ name: 'test3' }, get3);
        }

        var get3 = function(e) {
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            finish(testRun);
        };

        Cloud.KeyValues.remove({ name: 'test1' }, remove1);
    },

    // Done with the tests -- log out
    this.LogoutDrillbitUser = function(testRun) {
        Cloud.Users.logout(function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            finish(testRun);
        });
    }
}
function() {
    var finish;
    var valueOf;
    var Cloud;
    this.init = function(testUtils) {
        finish = testUtils.finish;
        valueOf = testUtils.valueOf;
        Cloud = require('ti.cloud');
    };

    this.name = "cloud statuses";
    this.tests = [
        {name: "Api"},
        {name: "LoginDrillbitUser", timeout: 30000},
        {name: "CreateMultiple", timeout: 30000},
        {name: "Search", timeout: 30000},
        {name: "Query", timeout: 30000},
        {name: "LogoutDrillbitUser", timeout: 30000}
    ];

    function verifyAPIs(testRun, namespace, functions) {
        for (var i = 0; i < functions.length; i++) {
            valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
        }
    }

    function convertISOToDate(isoDate) {
        isoDate = isoDate.replace(/\D/g," ");
        var dtcomps = isoDate.split(" ");
        dtcomps[1]--;
        return new Date(Date.UTC(dtcomps[0],dtcomps[1],dtcomps[2],dtcomps[3],dtcomps[4],dtcomps[5]));
    };

    var drillbitUserId;
    var startTime;

    // ---------------------------------------------------------------
    // Cloud.Statuses
    // ---------------------------------------------------------------

    // Test that all of the namespace APIs are available
    this.Api= function(testRun) {
        // Verify that all of the methods are exposed
        verifyAPIs(testRun, 'Statuses', [
            'create',
            'search',
            'query'
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

    this.CreateMultiple = function(testRun) {
        var statusCreated1 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.statuses.length).shouldBe(1);
            valueOf(testRun, e.statuses[0].message).shouldBe('Sleeping');
            // Grab the creation time of the first status that we create during this test so
            // we can query all statuses created by this test since there isn't a way to
            // delete them later from the database.
            startTime = convertISOToDate(e.statuses[0].created_at);
            startTime.setSeconds(startTime.getSeconds() - 10);
            Cloud.Statuses.create({ message: 'Awake' }, statusCreated2);
        };

        var statusCreated2 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.statuses.length).shouldBe(1);
            valueOf(testRun, e.statuses[0].message).shouldBe('Awake');
            Cloud.Statuses.create({ message: 'Idle' }, statusCreated3);
        };

        var statusCreated3 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.statuses.length).shouldBe(1);
            valueOf(testRun, e.statuses[0].message).shouldBe('Idle');
            finish(testRun);
        };

        Cloud.Statuses.create({ message: 'Sleeping' }, statusCreated1);
    },

    this.Search = function(testRun) {
        var data = {
            user_id: drillbitUserId,
            start_time: startTime
        };
        Cloud.Statuses.search(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.statuses.length).shouldBe(3);
            finish(testRun);
        });
    },

    this.Query = function(testRun) {
        var data = {
            where: {
                user_id: drillbitUserId,
                created_at: { '$gt': startTime }
            },
            order: '-created_at'
        };
        Cloud.Statuses.query(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.statuses.length).shouldBe(3);
            finish(testRun);
        });
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
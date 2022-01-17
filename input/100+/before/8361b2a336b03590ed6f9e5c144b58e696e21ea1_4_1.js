function() {
    var finish;
    var valueOf;
    var Cloud;
    this.init = function(testUtils) {
        finish = testUtils.finish;
        valueOf = testUtils.valueOf;
        Cloud = require('ti.cloud');
    };

    this.name = "cloud checkins";
    this.tests = [
        {name: "Api"},
        {name: "LoginDrillbitUser", timeout: 30000},
        {name: "Create", timeout: 30000},
        {name: "Show", timeout: 30000},
        {name: "DeleteCheckin", timeout: 30000},
        {name: "Cleanup", timeout: 30000},
        {name: "LogoutDrillbitUser", timeout: 30000}
    ];

    function verifyAPIs(testRun, namespace, functions) {
        for (var i = 0; i < functions.length; i++) {
            valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
        }
    }

    var placeId;
    var checkinId;

    // ---------------------------------------------------------------
    // Cloud.Checkins
    // ---------------------------------------------------------------

    // Test that all of the namespace APIs are available
    this.Api= function(testRun) {
        // Verify that all of the methods are exposed
        verifyAPIs(testRun, 'Checkins', [
            'create',
            'query',
            'show',
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

    this.Create = function(testRun) {
        var data = {
            name: 'Appcelerator HQ',
            address: '440 N. Bernardo Avenue',
            city: 'Mountain View',
            state: 'CA',
            postal_code: '94043',
            country: 'USA',
            website: 'http://www.appcelerator.com',
            phone_number: '650.200.4255',
            photo: Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'appcelerator.jpg'),
            tags: 'appcelerator, hq'
        };

        var placeCreated = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.places.length).shouldBe(1);
            valueOf(testRun, e.places[0].name).shouldBe('Appcelerator HQ');
            valueOf(testRun, e.places[0].photo).shouldBeObject();
            placeId = e.places[0].id;
            Cloud.Checkins.create({
                place_id: placeId,
                message: 'I am here',
                tags: 'HQ, work',
                custom_fields: {
                    project: 'ACS',
                    test: 'DrillBit'
                }
            }, checkinCreated);
        };

        var checkinCreated = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.checkins.length).shouldBe(1);
            valueOf(testRun, e.checkins[0].message).shouldBe('I am here');
            valueOf(testRun, e.checkins[0].place.id).shouldBe(placeId);
            valueOf(testRun, e.checkins[0].place.name).shouldBe('Appcelerator HQ');
            valueOf(testRun, e.checkins[0].user.id).shouldBe(drillbitUserId);
            valueOf(testRun, e.checkins[0].tags).shouldContain('HQ');
            valueOf(testRun, e.checkins[0].tags).shouldContain('work');
            valueOf(testRun, e.checkins[0].custom_fields).shouldBeObject();
            valueOf(testRun, e.checkins[0].custom_fields.project).shouldBe('ACS');
            valueOf(testRun, e.checkins[0].custom_fields.test).shouldBe('DrillBit');
            checkinId = e.checkins[0].id;
            Cloud.Checkins.query( function(e) {
                valueOf(testRun, e.success).shouldBeTrue();
                valueOf(testRun, e.error).shouldBeFalse();
                valueOf(testRun, e.checkins.length).shouldBe(1);
                valueOf(testRun, e.checkins[0].place.id).shouldBe(placeId);
                valueOf(testRun, e.checkins[0].message).shouldBe('I am here');
                valueOf(testRun, e.checkins[0].user.id).shouldBe(drillbitUserId);
                finish(testRun);
            });
        };

        Cloud.Places.create(data, placeCreated);
    },

    this.Show = function(testRun) {
        var data = {
            checkin_id: checkinId
        };
        Cloud.Checkins.show(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.checkins.length).shouldBe(1);
            valueOf(testRun, e.checkins[0].place.id).shouldBe(placeId);
            valueOf(testRun, e.checkins[0].message).shouldBe('I am here');
            valueOf(testRun, e.checkins[0].user.id).shouldBe(drillbitUserId);
            finish(testRun);
        });
    },

    this.DeleteCheckin = function(testRun) {
        var data = {
            checkin_id: checkinId
        };

        var removed = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            Cloud.Checkins.query(function(e) {
                valueOf(testRun, e.success).shouldBeTrue();
                valueOf(testRun, e.error).shouldBeFalse();
                valueOf(testRun, e.checkins.length).shouldBe(0);
                valueOf(testRun, e.meta.total_results).shouldBe(0);
                finish(testRun);
            });
        };

        Cloud.Checkins.remove(data, removed);
    },


    this.Cleanup= function(testRun) {
        var data = {
            place_id: placeId
        };
        Cloud.Places.remove(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
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
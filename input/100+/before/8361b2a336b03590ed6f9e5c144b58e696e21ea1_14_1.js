function() {
    var finish;
    var valueOf;
    var Cloud;
    this.init = function(testUtils) {
        finish = testUtils.finish;
        valueOf = testUtils.valueOf;
        Cloud = require('ti.cloud');
    };

    this.name = "cloud photos";
    this.tests = [
        {name: "Api"},
        {name: "LoginDrillbitUser", timeout: 30000},
        {name: "Create", timeout: 30000},
        {name: "CreateAndSearch", timeout: 30000},
        {name: "Show", timeout: 30000},
        {name: "Update", timeout: 30000},
        {name: "Query", timeout: 30000},
        {name: "QueryAndDeleteAll", timeout: 30000},
        {name: "LogoutDrillbitUser", timeout: 30000}
    ];

    function verifyAPIs(testRun, namespace, functions) {
        for (var i = 0; i < functions.length; i++) {
            valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
        }
    };

    var drillbitUserId;
    var ids = [];

    // ---------------------------------------------------------------
    // Cloud.Photos
    // ---------------------------------------------------------------

    // Test that all of the namespace APIs are available
    this.Api= function(testRun) {
        // Verify that all of the methods are exposed
        verifyAPIs(testRun, 'Photos', [
            'create',
            'show',
            'search',
            'query',
            'update',
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
            photo: Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'appcelerator.jpg'),
            tags: 'appcelerator, logo',
            'photo_sizes[preview]': '100x100#',
            'photo_sync_sizes[]': 'preview'
        };
        Cloud.Photos.create(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.photos.length).shouldBe(1);
            ids.push(e.photos[0].id);
            finish(testRun);
        });
    },

    this.CreateAndSearch= function(testRun) {
        var data = {
            photo: Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'apple_logo.jpg'),
            tags: 'apple, logo',
            'photo_sizes[preview]': '100x100#',
            'photo_sync_sizes[]': 'preview'
        };

        var photoCreated = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.photos.length).shouldBe(1);
            ids.push(e.photos[0].id);
            Cloud.Photos.search({ user_id: drillbitUserId }, searchResult);
        }

        var searchResult = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.photos.length).shouldBe(2);
            valueOf(testRun, e.photos[0].id).shouldBeOneOf(ids);
            valueOf(testRun, e.photos[1].id).shouldBeOneOf(ids);
            finish(testRun);
        };

        Cloud.Photos.create(data, photoCreated);
    },

    this.Show = function(testRun) {
        var data = {
            photo_id: ids[0]
        };
        Cloud.Photos.show(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.photos.length).shouldBe(1);
            valueOf(testRun, e.photos[0].id).shouldBe(ids[0]);
            finish(testRun);
        });
    },

    this.Update= function(testRun) {
        var data = {
            photo_id: ids[0],
            tags: 'appcelerator, logo, test',
            custom_data_fields: {
                year: 2012
            },
            'photo_sizes[preview]': '100x100#',
            'photo_sync_sizes[]': 'preview'
        };

        var updatePhotos = function(e) {
            Cloud.Photos.update(data, function(e) {
                valueOf(testRun, e.success).shouldBeTrue();
                valueOf(testRun, e.error).shouldBeFalse();
                valueOf(testRun, e.photos.length).shouldBe(1);
                valueOf(testRun, e.photos[0].id).shouldBe(ids[0]);
                valueOf(testRun, e.photos[0].tags).shouldContain('appcelerator');
                valueOf(testRun, e.photos[0].tags).shouldContain('logo');
                valueOf(testRun, e.photos[0].tags).shouldContain('test');
                finish(testRun);
            });
        };

        // NOTE: We need to wait a little bit for the photos to be processed. So,
        // for testing we insert a slight delay so that the photos can be processed
        setTimeout(updatePhotos, 5000);
    },

    this.Query = function(testRun) {
        Cloud.Photos.query(function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.photos.length).shouldBe(2);
            valueOf(testRun, e.photos[0].id).shouldBeOneOf(ids);
            valueOf(testRun, e.photos[1].id).shouldBeOneOf(ids);
            finish(testRun);
        });
    },

    this.QueryAndDeleteAll = function(testRun) {
        var ids = [];

        var queryResult1 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            for (var i=0; i<e.photos.length; i++) {
                ids.push(e.photos[i].id);
            }
            deletePhoto(e);
        };

        var deletePhoto = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            if (ids.length == 0) {
                // NOTE: We need to wait a little bit for the photos to be processed. So,
                // for testing we insert a slight delay so that the photos can be processed
                setTimeout(query2, 5000);
            } else {
                Cloud.Photos.remove({ photo_id: ids.pop() }, deletePhoto);
            }
        };

        var query2 = function(e) {
            Cloud.Photos.query(function(e) {
                valueOf(testRun, e.success).shouldBeTrue();
                valueOf(testRun, e.error).shouldBeFalse();
                valueOf(testRun, e.photos.length).shouldBe(0);
                valueOf(testRun, e.meta.total_results).shouldBe(0);
                finish(testRun);
            });
        };

        Cloud.Photos.query(queryResult1);
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
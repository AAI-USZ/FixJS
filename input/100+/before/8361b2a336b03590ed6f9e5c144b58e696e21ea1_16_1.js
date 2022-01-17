function() {
    var finish;
    var valueOf;
    var Cloud;
    this.init = function(testUtils) {
        finish = testUtils.finish;
        valueOf = testUtils.valueOf;
        Cloud = require('ti.cloud');
    };

    this.name = "cloud posts";
    this.tests = [
        {name: "Api"},
        {name: "LoginDrillbitUser", timeout: 30000},
        {name: "Create", timeout: 30000},
        {name: "CreateAndShow", timeout: 30000},
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
    }

    var drillbitUserId;
    var ids = [];

    // ---------------------------------------------------------------
    // Cloud.Posts
    // ---------------------------------------------------------------

    // Test that all of the namespace APIs are available
    this.Api= function(testRun) {
        // Verify that all of the methods are exposed
        verifyAPIs(testRun, 'Posts', [
            'create',
            'show',
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
            content: 'Welcome to Drillbit',
            title: 'Welcome',
            photo: Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'appcelerator.jpg')
        };
        Cloud.Posts.create(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.posts.length).shouldBe(1);
            valueOf(testRun, e.posts[0].title).shouldBe('Welcome');
            valueOf(testRun, e.posts[0].content).shouldBe('Welcome to Drillbit');
            valueOf(testRun, e.posts[0].photo).shouldBeObject();
            valueOf(testRun, e.posts[0].user.id).shouldBe(drillbitUserId);
            ids.push(e.posts[0].id);
            finish(testRun);
        });
    },

    this.CreateAndShow = function(testRun) {
        var data = {
            content: 'Welcome to Hawaii',
            title: 'Aloha'
        };

        var postCreated = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.posts.length).shouldBe(1);
            valueOf(testRun, e.posts[0].title).shouldBe('Aloha');
            valueOf(testRun, e.posts[0].content).shouldBe('Welcome to Hawaii');
            ids.push(e.posts[0].id);
            Cloud.Posts.show({ post_id: ids[0] }, postShown);
        };

        var postShown = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.posts.length).shouldBe(1);
            valueOf(testRun, e.posts[0].id).shouldBe(ids[0]);
            valueOf(testRun, e.posts[0].title).shouldBe('Welcome');
            valueOf(testRun, e.posts[0].content).shouldBe('Welcome to Drillbit');
            valueOf(testRun, e.posts[0].photo).shouldBeObject();
            valueOf(testRun, e.posts[0].user.id).shouldBe(drillbitUserId);
            finish(testRun);
        };

        Cloud.Posts.create(data, postCreated);
    },

    this.Show = function(testRun) {
        var data = {
            post_ids: ids.toString()
        };
        Cloud.Posts.show(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.posts.length).shouldBe(2);
            valueOf(testRun, e.posts[0].id).shouldBeOneOf(ids);
            valueOf(testRun, e.posts[1].id).shouldBeOneOf(ids);
            finish(testRun);
        });
    },

    this.Update = function(testRun) {
        var data = {
            post_id: ids[1],
            content: 'Welcome to the Hawaiian Islands'
        };
        Cloud.Posts.update(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.posts.length).shouldBe(1);
            valueOf(testRun, e.posts[0].id).shouldBe(ids[1]);
            valueOf(testRun, e.posts[0].title).shouldBe('Aloha');
            valueOf(testRun, e.posts[0].content).shouldBe('Welcome to the Hawaiian Islands');
            valueOf(testRun, e.posts[0].user.id).shouldBe(drillbitUserId);
            finish(testRun);
        });
    },

    this.Query = function(testRun) {
        var data = {
            where: {
                title: 'Welcome'
            }
        };
        Cloud.Posts.query(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.posts.length).shouldBe(1);
            valueOf(testRun, e.posts[0].title).shouldBe('Welcome');
            valueOf(testRun, e.posts[0].content).shouldBe('Welcome to Drillbit');
            valueOf(testRun, e.posts[0].photo).shouldBeObject();
            valueOf(testRun, e.posts[0].user.id).shouldBe(drillbitUserId);
            finish(testRun);
        });
    },

    this.QueryAndDeleteAll = function(testRun) {
        var ids = [];

        var queryResult1 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            for (var i=0; i<e.posts.length; i++) {
                ids.push(e.posts[i].id);
            }
            removePost(e);
        }

        var removePost = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            if (ids.length == 0) {
                Cloud.Posts.query(queryResult2);
            } else {
                Cloud.Posts.remove({ post_id: ids.pop() }, removePost);
            }
        }

        var queryResult2 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.posts.length).shouldBe(0);
            valueOf(testRun, e.meta.total_results).shouldBe(0);
            finish(testRun);
        }

        Cloud.Posts.query(queryResult1);
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
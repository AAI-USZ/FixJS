function() {
    var finish;
    var valueOf;
    var Cloud;
    this.init = function(testUtils) {
        finish = testUtils.finish;
        valueOf = testUtils.valueOf;
        Cloud = require('ti.cloud');
    };

    this.name = "cloud reviews";
    this.tests = [
        {name: "Api"},
        {name: "LoginDrillbitUser", timeout: 30000},
        {name: "Create", timeout: 30000},
        {name: "CreateAndShow", timeout: 30000},
        {name: "Show", timeout: 30000},
        {name: "Update", timeout: 30000},
        {name: "Query", timeout: 30000},
        {name: "QueryAndDeleteAll", timeout: 30000},
        {name: "Cleanup", timeout: 30000},
        {name: "LogoutDrillbitUser", timeout: 30000}
    ];

    function verifyAPIs(testRun, namespace, functions) {
        for (var i = 0; i < functions.length; i++) {
            valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
        }
    }

    var drillbitUserId;
    var ids = [];
    var postId;

    // ---------------------------------------------------------------
    // Cloud.Reviews
    // ---------------------------------------------------------------

    // Test that all of the namespace APIs are available
    this.Api= function(testRun) {
        // Verify that all of the methods are exposed
        verifyAPIs(testRun, 'Reviews', [
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

    this.Create= function(testRun) {
        var data = {
            user_id: drillbitUserId,
            content: 'Good',
            rating: 5,
            allow_duplicate: 1
        };
        Cloud.Reviews.create(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.reviews.length).shouldBe(1);
            valueOf(testRun, e.reviews[0].content).shouldBe('Good');
            valueOf(testRun, e.reviews[0].rating).shouldBe(5);
            valueOf(testRun, e.reviews[0].user.id).shouldBe(drillbitUserId);
            ids.push(e.reviews[0].id);
            finish(testRun);
        });
    },

    this.CreateAndShow= function(testRun) {
        var data = {
            content: 'Welcome to Hawaii',
            title: 'Aloha'
        };

        var created1 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.posts.length).shouldBe(1);
            valueOf(testRun, e.posts[0].title).shouldBe('Aloha');
            valueOf(testRun, e.posts[0].content).shouldBe('Welcome to Hawaii');
            postId = e.posts[0].id;
            Cloud.Reviews.create({
                post_id: postId,
                content: 'Review of Hawaii',
                rating: 10,
                allow_duplicate: 1
           }, created2);
        }

        var created2 =  function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.reviews.length).shouldBe(1);
            valueOf(testRun, e.reviews[0].content).shouldBe('Review of Hawaii');
            valueOf(testRun, e.reviews[0].rating).shouldBe(10);
            ids.push(e.reviews[0].id);
            Cloud.Reviews.create({
                post_id: postId,
                content: 'Another Review of Hawaii',
                rating: 20,
                allow_duplicate: 1
            }, created3);
        }

        var created3 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.reviews.length).shouldBe(1);
            valueOf(testRun, e.reviews[0].content).shouldBe('Another Review of Hawaii');
            valueOf(testRun, e.reviews[0].rating).shouldBe(20);
            ids.push(e.reviews[0].id);
            Cloud.Reviews.show({
                post_id: postId,
                review_id: ids[1]
            }, shown);
        }

        var shown = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.reviews.length).shouldBe(1);
            valueOf(testRun, e.reviews[0].id).shouldBe(ids[1]);
            valueOf(testRun, e.reviews[0].content).shouldBe('Review of Hawaii');
            valueOf(testRun, e.reviews[0].rating).shouldBe(10);
            valueOf(testRun, e.reviews[0].user.id).shouldBe(drillbitUserId);
            finish(testRun);
        }

        Cloud.Posts.create(data, created1);
    },

    this.Show= function(testRun) {
        var data = {
            user_id: drillbitUserId,
            review_id: ids[0]
        };
        Cloud.Reviews.show(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.reviews.length).shouldBe(1);
            valueOf(testRun, e.reviews[0].content).shouldBe('Good');
            valueOf(testRun, e.reviews[0].rating).shouldBe(5);
            valueOf(testRun, e.reviews[0].user.id).shouldBe(drillbitUserId);
            finish(testRun);
        });
    },

    this.Update= function(testRun) {
        var data = {
            post_id: postId,
            review_id: ids[1],
            content: 'It is a great day in Hawaii',
            rating: 100
        };
        Cloud.Reviews.update(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.reviews.length).shouldBe(1);
            valueOf(testRun, e.reviews[0].id).shouldBe(ids[1]);
            valueOf(testRun, e.reviews[0].content).shouldBe('It is a great day in Hawaii');
            valueOf(testRun, e.reviews[0].rating).shouldBe(100);
            valueOf(testRun, e.reviews[0].user.id).shouldBe(drillbitUserId);
            finish(testRun);
        });
    },

    this.Query= function(testRun) {
        var data = {
            post_id: postId,
            where: {
                rating: { '$gte': 50 }
            }
        };
        Cloud.Reviews.query(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.reviews.length).shouldBe(1);
            valueOf(testRun, e.reviews[0].id).shouldBe(ids[1]);
            valueOf(testRun, e.reviews[0].content).shouldBe('It is a great day in Hawaii');
            valueOf(testRun, e.reviews[0].rating).shouldBe(100);
            valueOf(testRun, e.reviews[0].user.id).shouldBe(drillbitUserId);
            finish(testRun);
        });
    },

    this.QueryAndDeleteAll= function(testRun) {
        var ids = [];

        var queryResult1 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            for (var i=0; i<e.reviews.length; i++) {
                ids.push(e.reviews[i].id);
            }
            removeReview(e);
        }

        var removeReview = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            if (ids.length == 0) {
                Cloud.Reviews.query({ user_id: drillbitUserId }, queryResult2);
            } else {
                Cloud.Reviews.remove({
                    review_id: ids.pop(),
                    user_id: drillbitUserId
                }, removeReview);
            }
        }

        var queryResult2 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.reviews.length).shouldBe(0);
            valueOf(testRun, e.meta.total_results).shouldBe(0);
            finish(testRun);
        }

        Cloud.Reviews.query({ user_id: drillbitUserId }, queryResult1);
    },

    this.Cleanup= function(testRun) {
        var data = {
            post_id: postId
        };
        Cloud.Posts.remove(data, function(e) {
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
function() {
    var finish;
    var valueOf;
    var Cloud;
    this.init = function(testUtils) {
        finish = testUtils.finish;
        valueOf = testUtils.valueOf;
        Cloud = require('ti.cloud');
    };

    this.name = "cloud users";
    this.tests = [
        {name: "Api"},
        {name: "CreateInvalidArguments", timeout: 30000},
        {name: "CreateEmptyUser", timeout: 30000},
        {name: "CreateNoPassword", timeout: 30000},
        {name: "CreateNoConfirmation", timeout: 30000},
        {name: "CreateMismatchedPassword", timeout: 30000},
        {name: "CreateNoUsername", timeout: 30000},
        {name: "CreateEmailNoName", timeout: 30000},
        {name: "CreateUserWithUserName", timeout: 30000},
        {name: "CreateUserWithEMail", timeout: 30000},
        {name: "LoginUserUnknownUser", timeout: 30000},
        {name: "LoginUserBadPassword", timeout: 30000},
        {name: "LoginUser1", timeout: 30000},
        {name: "LogoutUser1", timeout: 30000},
        {name: "LoginUser2", timeout: 30000},
        {name: "LogoutUser2", timeout: 30000},
        {name: "Loginlogout", timeout: 30000},
        {name: "ShowUsers", timeout: 30000},
        {name: "ShowMeSetUp", timeout: 30000},
        {name: "ShowMe", timeout: 30000},
        {name: "UpdateUser", timeout: 30000},
        {name: "SearchOneUser", timeout: 30000},
        {name: "SearchPageTwoUser", timeout: 30000},
        {name: "QueryOneUser", timeout: 30000},
        {name: "QueryOneUserIn", timeout: 30000},
        {name: "DeleteOneUser", timeout: 30000},
        {name: "DeleteAllUsers", timeout: 30000}
    ];

    function verifyAPIs(testRun, namespace, functions) {
        for (var i = 0; i < functions.length; i++) {
            valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
        }
    };

    var Users = { ids: [] };

    // 1. The following tests assume the existence of the application on api.cloud.appcelerator.com.
    // 2. The following users must exist in the application:
    //    username: 'drillbituser'
    //    password: 'password'
    //    username: 'chatuser'
    //    password: 'password'
    // 3. There should not be any other users defined in the application

    // ---------------------------------------------------------------
    // Cloud.Users
    // ---------------------------------------------------------------

    // Test that all of the namespace APIs are available
    this.Api = function(testRun) {
        // Verify that all of the methods are exposed
        verifyAPIs(testRun, 'Users', [
            'create',
            'login',
            'show',
            'showMe',
            'search',
            'query',
            'update',
            'logout',
            'remove',
            'requestResetPassword'
        ]);
        finish(testRun);
    },

    // Cloud.Users.create
    this.CreateInvalidArguments = function(testRun) {
        valueOf(testRun, function() {
            Cloud.Users.create()
        }).shouldThrowException();
        valueOf(testRun, function() {
            Cloud.Users.create(0,0)
        }).shouldThrowException();
        valueOf(testRun, function() {
            Cloud.Users.create({},0)
        }).shouldThrowException();
        valueOf(testRun, function() {
            Cloud.Users.create({})
        }).shouldThrowException();
        finish(testRun);
    },

    this.CreateEmptyUser = function(testRun) {
        var data = {};

        Cloud.Users.create(data, function(e) {
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            finish(testRun);
        });
    },

    this.CreateNoPassword = function(testRun) {
        var data = {
            username: 'testuser'
        };

        Cloud.Users.create(data, function(e) {
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            finish(testRun);
        });
    },

    this.CreateNoConfirmation = function(testRun) {
        var data = {
            username: 'testuser',
            password: 'password'
        };

        Cloud.Users.create(data, function(e) {
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            finish(testRun);
        });
    },

    this.CreateMismatchedPassword = function(testRun) {
        var data = {
            username: 'testuser',
            password: 'password',
            password_confirmation: 'bad'
        };

        Cloud.Users.create(data, function(e) {
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            finish(testRun);
        });
    },

    this.CreateNoUsername = function(testRun) {
        var data = {
            password: 'password',
            password_confirmation: 'password'
        };

        Cloud.Users.create(data, function(e) {
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            finish(testRun);
        });
    },

    this.CreateEmailNoName = function(testRun) {
        var data = {
            email: 'testuser@appcelerator.com',
            password: 'password',
            password_confirmation: 'password'
        };

        Cloud.Users.create(data, function(e) {
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            finish(testRun);
        });
    },

    this.CreateUserWithUserName = function(testRun) {
        var data = {
            username: 'testuser1',
            password: 'password',
            password_confirmation: 'password',
            tags: 'hiking, swimming'
        };

        var created = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            Cloud.Users.logout(loggedOut);
        };

        var loggedOut = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            finish(testRun);
        };

        Cloud.Users.create(data, created);
    },

    this.CreateUserWithEMail = function(testRun) {
        var data = {
            email: 'testuser2@appcelerator.com',
            password: 'password',
            password_confirmation: 'password',
            first_name: 'test',
            last_name: 'user'
        };

        var created = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            Cloud.Users.logout(loggedOut);
        };

        var loggedOut = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            finish(testRun);
        };

        Cloud.Users.create(data, created);
    },

    // Cloud.Users.login and Cloud.Users.logout
    this.LoginUserUnknownUser = function(testRun) {
        var data = {
            login: 'tttt',
            password: 'password'
        };

        Cloud.Users.login(data, function(e) {
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            finish(testRun);
        });
    },

    this.LoginUserBadPassword = function(testRun) {
        var data = {
            login: 'testuser1',
            password: 'tttt'
        };

        Cloud.Users.login(data, function(e) {
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            finish(testRun);
        });
    },

    this.LoginUser1 = function(testRun) {
        var data = {
                login: 'testuser1',
                password: 'password'
        };

        Cloud.Users.login(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.users[0].tags).shouldContain('hiking');
            valueOf(testRun, e.users[0].tags).shouldContain('swimming');
            valueOf(testRun, e.users[0].first_name).shouldBeUndefined();
            valueOf(testRun, e.users[0].last_name).shouldBeUndefined();
            // Save off the id for later test
            Users.ids.push(e.users[0].id);
            finish(testRun);
        });
    },

    this.LogoutUser1 = function(testRun) {
        Cloud.Users.logout( function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            finish(testRun);
        });
    },

    this.LoginUser2 = function(testRun) {
        var data = {
            login: 'testuser2@appcelerator.com',
            password: 'password'
        };
        Cloud.Users.login(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.users[0].tags).shouldBeUndefined();
            valueOf(testRun, e.users[0].first_name).shouldBe('test');
            valueOf(testRun, e.users[0].last_name).shouldBe('user');
            // Save off the id for later test
            Users.ids.push(e.users[0].id);
            finish(testRun);
        });
    },

    this.LogoutUser2 = function(testRun) {
        Cloud.Users.logout( function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            finish(testRun);
        });
    },

    // Test switching user rapidly
    this.Loginlogout = function(testRun) {
        var loggedIn1 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.users[0].id).shouldBe(Users.ids[0]);
            Cloud.Users.showMe(shown1);
        };

        var shown1 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.users[0].id).shouldBe(Users.ids[0]);
            Cloud.Users.logout(loggedOut1);
        };

        var loggedOut1 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            Cloud.Users.login({
                login: 'testuser2@appcelerator.com',
                password: 'password'
            }, loggedIn2);
        };

        var loggedIn2 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.users[0].id).shouldBe(Users.ids[1]);
            Cloud.Users.showMe(shown2);
        };

        var shown2 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.users[0].id).shouldBe(Users.ids[1]);
            Cloud.Users.logout(loggedOut2);
        };

        var loggedOut2 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            finish(testRun);
        };

        Cloud.Users.login({
            login: 'testuser1',
            password: 'password'
        }, loggedIn1);
    },

    // Cloud.Users.show
    this.ShowUsers = function(testRun) {
        var data = {
            user_ids: Users.ids.toString()
        };

        Cloud.Users.show(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.users.length).shouldBe(2);
            if (e.users[0].id == Users.ids[0]) {
                valueOf(testRun, e.users[0].username).shouldBe('testuser1');
                valueOf(testRun, e.users[1].first_name).shouldBe('test');
            } else {
                valueOf(testRun, e.users[1].username).shouldBe('testuser1');
                valueOf(testRun, e.users[0].first_name).shouldBe('test');
            }
            finish(testRun);
        });
    },

    // Cloud.Users.showMe and TiCloud.Users.update
    this.ShowMeSetUp = function(testRun) {
        var data = {
            login: 'testuser1',
            password: 'password'
        };

        Cloud.Users.login(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            finish(testRun);
        });
    },

    this.ShowMe = function(testRun) {
        Cloud.Users.showMe( function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.users[0].tags).shouldContain('hiking');
            valueOf(testRun, e.users[0].tags).shouldContain('swimming');
            valueOf(testRun, e.users[0].first_name).shouldBeUndefined();
            valueOf(testRun, e.users[0].last_name).shouldBeUndefined();
            finish(testRun);
        });
    },

    this.UpdateUser = function(testRun) {
        var data = {
            first_name: 'joe',
            last_name: 'user',
            tags: 'golf, snowboarding',
            custom_fields: {
                color: 'red',
                number: 5
            }
        };

        Cloud.Users.update(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.users[0].tags).shouldContain('golf');
            valueOf(testRun, e.users[0].tags).shouldContain('snowboarding');
            valueOf(testRun, e.users[0].first_name).shouldBe('joe')
            valueOf(testRun, e.users[0].last_name).shouldBe('user');
            valueOf(testRun, e.users[0].custom_fields.color).shouldBe('red');
            valueOf(testRun, e.users[0].custom_fields.number).shouldBe(5);
            finish(testRun);
        });
    },

    // Cloud.Users.search
    this.SearchOneUser = function(testRun) {
        var data = {
            q: 'golf'
        };

        Cloud.Users.search(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.users.length).shouldBe(1);
            valueOf(testRun, e.users[0].tags).shouldContain('golf');
            valueOf(testRun, e.users[0].first_name).shouldBe('joe');
            valueOf(testRun, e.users[0].last_name).shouldBe('user');
            finish(testRun);
        });
    },

    this.SearchPageTwoUser = function(testRun) {
        var data = {
            q: 'user',
            page: 2,
            per_page: 1
        };

        Cloud.Users.search(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.users.length).shouldBe(1);
            valueOf(testRun, e.users[0].last_name).shouldBe('user');
            // Since we can't specify the order of results, we have no guarantee of which entry we got
            finish(testRun);
        });
    },

    // Cloud.Users.query
    this.QueryOneUser = function(testRun) {
        var data = {
            limit: 1,
            skip: 0,
            where: { color: 'red'}
        };

        Cloud.Users.query(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.users.length).shouldBe(1);
            valueOf(testRun, e.users[0].tags).shouldContain('golf');
            valueOf(testRun, e.users[0].first_name).shouldBe('joe');
            valueOf(testRun, e.users[0].last_name).shouldBe('user');
            finish(testRun);
        });
    },

    this.QueryOneUserIn = function(testRun) {
        var data = {
            where: { color: { '$in':['blue','red'] } }
        };

        Cloud.Users.query(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.users.length).shouldBe(1);
            valueOf(testRun, e.users[0].tags).shouldContain('golf');
            valueOf(testRun, e.users[0].first_name).shouldBe('joe');
            valueOf(testRun, e.users[0].last_name).shouldBe('user');
            finish(testRun);
        });
    },

    // Cloud.Users.remove
    this.DeleteOneUser = function(testRun) {
        var loggedIn = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            Cloud.Users.remove(removed);
        };

        var removed = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            Cloud.Users.query({ where: { email: 'testuser2@appcelerator.com' } }, finished);
        }

        var finished = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.users.length).shouldBe(0);
            finish(testRun);
        };

        // Must be logged in in order to delete
        Cloud.Users.login({ login: 'testuser2@appcelerator.com', password: 'password'}, loggedIn);
    },

    // Remove any users that we added to the database so it is back in its original state
    this.DeleteAllUsers = function(testRun) {
        var loggedIn1 = function(e) {
            if (e.success) {
                Cloud.Users.remove(removed1);
            } else {
                removed1({ success: true });
            }
        };

        var removed1 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            Cloud.Users.login({
                login: 'testuser2@appcelerator.com',
                password: 'password'
            }, loggedIn2);
        };

        var loggedIn2 = function(e) {
            if (e.success) {
                Cloud.Users.remove(removed2);
            } else {
                removed2({ success: true });
            }
        };

        var removed2 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            finish(testRun);
        };

        Cloud.Users.login({ login: 'testuser1', password: 'password' }, loggedIn1);
    }
}
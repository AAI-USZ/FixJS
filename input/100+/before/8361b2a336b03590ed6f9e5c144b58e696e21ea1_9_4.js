function(testRun) {
        var loggedOut = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            finish(testRun);
        };

	    var friendsRemoved = function(e) {
		    valueOf(testRun, e.success).shouldBeTrue();
		    Cloud.Users.logout(loggedOut);
	    }

        var searchResult = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
	        valueOf(testRun, e.users.length).shouldBe(1);
	        Cloud.Friends.remove({
		        user_ids: e.users[0].id
	        }, friendsRemoved)
        };

        var loggedIn = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            Cloud.Friends.search({
                user_id: e.users[0].id
            }, searchResult);
        };

        Cloud.Users.login({
            login: 'drillbituser',
            password: 'password'
        }, loggedIn);
    }
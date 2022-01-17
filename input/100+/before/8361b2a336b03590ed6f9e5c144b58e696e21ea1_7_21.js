function() {
    var finish;
    var valueOf;
    var Cloud;
    this.init = function(testUtils) {
        finish = testUtils.finish;
        valueOf = testUtils.valueOf;
        Cloud = require('ti.cloud');
    };

    this.name = "cloud events";

	function deleteAllEventsForUser(testRun, userId, password) {
		var ids = [];

		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var deleteEvent = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			if (ids.length == 0) {
				Cloud.Users.logout(loggedOut);
			} else {
				Cloud.Events.remove({
					event_id: ids.pop()
				}, deleteEvent);
			}
		};

		var searchResult = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			for (var i = 0; i < e.events.length; i++) {
				ids.push(e.events[i].id);
			}
			deleteEvent(e);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.search(searchResult);
		};

		Cloud.Users.login({
			login: userId,
			password: password
		}, loggedIn);
	};

    // ---------------------------------------------------------------
    // Cloud.Events
    // ---------------------------------------------------------------

	var eventId;
	var eventIdWithPhoto;
	var eventCount = 0;

    // Test that all of the namespace APIs are available
    this.testApi= function(testRun) {
        // Verify that all of the methods are exposed
	    valueOf(testRun, Cloud.Events.create).shouldBeFunction();
	    valueOf(testRun, Cloud.Events.show).shouldBeFunction();
	    valueOf(testRun, Cloud.Events.showOccurrences).shouldBeFunction();
	    valueOf(testRun, Cloud.Events.query).shouldBeFunction();
	    valueOf(testRun, Cloud.Events.queryOccurrences).shouldBeFunction();
	    valueOf(testRun, Cloud.Events.search).shouldBeFunction();
	    valueOf(testRun, Cloud.Events.searchOccurrences).shouldBeFunction();
	    valueOf(testRun, Cloud.Events.update).shouldBeFunction();
	    valueOf(testRun, Cloud.Events.remove).shouldBeFunction();
        finish(testRun);
    };

	this.testCreate = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var eventCreated = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.events.length).shouldBe(1);
			valueOf(testRun, e.events[0].name).shouldBe('Event #1');
			valueOf(testRun, e.events[0].recurring).shouldBe('weekly');
			valueOf(testRun, e.events[0].recurring_count).shouldBe(5);
			eventId = e.events[0].id;
			eventCount++;
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.create({
				name: 'Event #1',
				start_time: new Date(),
				recurring: 'weekly',
				recurring_count: 5
			}, eventCreated)
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};

	this.testCreateWithPhoto = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var eventCreated = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.events.length).shouldBe(1);
			valueOf(testRun, e.events[0].name).shouldBe('Event #2');
			valueOf(testRun, e.events[0].photo).shouldBeObject();
			eventIdWithPhoto = e.events[0].id;
			eventCount++;
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.create({
				name: 'Event #2',
				start_time: new Date(),
				photo: Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'appcelerator.jpg'),
				'photo_sizes[preview]': '100x100#',
                'photo_sync_sizes[]': 'preview'
			}, eventCreated)
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testCreateWithPhoto.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testShowEvent = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var showResult = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.events.length).shouldBe(1);
			valueOf(testRun, e.events[0].name).shouldBe('Event #1');
			valueOf(testRun, e.events[0].recurring).shouldBe('weekly');
			valueOf(testRun, e.events[0].recurring_count).shouldBe(5);
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.show({
				event_id: eventId
			}, showResult);
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};

	this.testShowEventWithPhoto = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var showResult = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.events.length).shouldBe(1);
			valueOf(testRun, e.events[0].name).shouldBe('Event #2');
			valueOf(testRun, e.events[0].photo).shouldBeObject();
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.show({
				event_id: eventIdWithPhoto
			}, showResult);
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testShowEventWithPhoto.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testShowEventOccurrences = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var showResult = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.event_occurrences.length).shouldBe(5);
			for (var i = 0; i < 5; i++) {
				valueOf(testRun, e.event_occurrences[i].event.name).shouldBe('Event #1');
			}
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.showOccurrences({
				event_id: eventId
			}, showResult);
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};

	this.testQueryEventNoData = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var queryResult = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.events.length).shouldBe(eventCount);
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.query(queryResult);
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};

	this.testQueryEventWhere = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var queryResult = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.events.length).shouldBe(1);
			valueOf(testRun, e.events[0].name).shouldBe('Event #1');
			valueOf(testRun, e.events[0].recurring).shouldBe('weekly');
			valueOf(testRun, e.events[0].recurring_count).shouldBe(5);
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.query({
				where: { name: 'Event #1' }
			}, queryResult);
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};

	this.testQueryEventOccurrencesNoData = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var queryResult = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			// Number of occurrences for first event is 5 (1 + 4 repeats)
			// Number of occurrences for second event is 1, but it may not have
			//   been created based on platform.
			valueOf(testRun, e.event_occurrences.length).shouldBe(eventCount+4);
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.queryOccurrences(queryResult);
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};

	this.testQueryEventOccurrencesWhere = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var queryResult = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.event_occurrences.length).shouldBe(5);
			for (var i = 0; i < 5; i++) {
				valueOf(testRun, e.event_occurrences[i].event.name).shouldBe('Event #1');
			}
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.queryOccurrences({
				where: { name: 'Event #1' }
			}, queryResult);
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};

	this.testSearchEventNoData = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var searchResult = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.events.length).shouldBe(eventCount);
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.search(searchResult);
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};

	this.testSearchEventQ = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var searchResult = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.events.length).shouldBe(1);
			valueOf(testRun, e.events[0].name).shouldBe('Event #1');
			valueOf(testRun, e.events[0].recurring).shouldBe('weekly');
			valueOf(testRun, e.events[0].recurring_count).shouldBe(5);
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.search({
				q: '#1'
			}, searchResult);
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};

	this.testSearchEventOccurrencesNoData = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var searchResult = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			// Number of occurrences for first event is 5 (1 + 4 repeats)
			// Number of occurrences for second event is 1, but it may not have
			//   been created based on platform.
			valueOf(testRun, e.event_occurrences.length).shouldBe(eventCount+4);
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.searchOccurrences(searchResult);
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};

	this.testSearchEventOccurrencesQ = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var searchResult = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.event_occurrences.length).shouldBe(5);
			for (var i = 0; i < 5; i++) {
				valueOf(testRun, e.event_occurrences[i].event.name).shouldBe('Event #1');
			}
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.searchOccurrences({
				q: '#1'
			}, searchResult);
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};

	this.testUpdate = function(testRun) {
		var loggedOut = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var showResult = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.event_occurrences.length).shouldBe(3);
			for (var i = 0; i < 3; i++) {
				valueOf(testRun, e.event_occurrences[i].event.name).shouldBe('Event #99');
			}
			Cloud.Users.logout(loggedOut);
		};

		var eventUpdated = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.events.length).shouldBe(1);
			valueOf(testRun, e.events[0].name).shouldBe('Event #99');
			valueOf(testRun, e.events[0].recurring).shouldBe('daily');
			valueOf(testRun, e.events[0].recurring_count).shouldBe(3);
			Cloud.Events.showOccurrences({
				event_id: eventId
			}, showResult);
		};

		var loggedIn = function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Events.update({
				event_id: eventId,
				name: 'Event #99',
				start_time: new Date(),
				recurring: 'daily',
				recurring_count: 3
			}, eventUpdated)
		};

		Cloud.Users.login({
			login: 'drillbituser',
			password: 'password'
		}, loggedIn);
	};

	this.testDeleteAllEventsForDrillbitUser = function(testRun) {
		deleteAllEventsForUser(testRun, 'drillbituser', 'password');
	};

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 30000);
}
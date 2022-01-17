function(topic, params) {
			// unsubscribe to avoid multiple test cases execution
			suite.counter.events.unsubscribe({
				"handlerId" : handlerId
			});
			QUnit.deepEqual(
				params.data,
				{
					"result" : "error",
					"errorCode" : "more_than",
					"errorMessage" : 5000,
					"liveUpdatesTimeout" : NaN
				},
				'Checking the restrictions of the count API. Error: "more_than"');
			QUnit.ok($(params.target).html() === "<span>5000+</span>",
				'Checking the Error: "more_than" usecase rendering');
			callback();
		}
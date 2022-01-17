function(topic, params) {
				// unsubscribe to avoid multiple test cases execution
				Echo.Events.unsubscribe({
					"handlerId" : handlerId
				});
				QUnit.ok($(target).html().match(/echo-identityserver-controls-auth-userLogged/),
					'Checking the logged user mode rendering');
				QUnit.start();
			}
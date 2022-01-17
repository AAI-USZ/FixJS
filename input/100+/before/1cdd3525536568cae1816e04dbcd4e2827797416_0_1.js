function() {
		var identityManager = {"width": 400, "height": 240, "url": "https://echo.rpxnow.com/openid/embed?flags=stay_in_window,no_immediate&token_url=http%3A%2F%2Fjs-kit.com%2Fapps%2Fjanrain%2Fwaiting.html&bp_channel="};
		var target = document.getElementById("qunit-fixture");	
		$(target).empty();
		var auth = new Echo.IdentityServer.Controls.Auth({
			"target": target,
			"appkey": "test.aboutecho.com",
			"identityManager": {
				"login": identityManager,
				"signup": identityManager
			}
		});
		var handlerId = auth.events.subscribe({
			"topic"   : "Echo.IdentityServer.Controls.Auth.onRender",
			"handler" : function(topic, params) {
				// unsubscribe to avoid multiple test cases execution
				auth.events.unsubscribe({
					"handlerId" : handlerId
				});
				QUnit.ok($(target).html().match(/echo-identityserver-controls-auth-userAnonymous/),
					'Checking the anonymous mode rendering');
				QUnit.start();
			}
		});
	}
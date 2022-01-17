function(doh, Application, json, config, topic, Load, Transition, Layout, History){
	doh.register("dojox.app.tests.doh.controllers", [
		{
			timeout: 2000,
			name: "controllers",
			runTest: function(t){
				var dohDeferred = new doh.Deferred();
				this._topic = topic.subscribe("/app/status", function(evt){
					if(evt == 2){
						// test controllers
						t.assertEqual(4, testApp.controllers.length);
						t.assertEqual(4, testApp.controllers[0] instanceof Load);
						t.assertEqual(4, testApp.controllers[1] instanceof Transition);
						t.assertEqual(4, testApp.controllers[2] instanceof Layout);
						t.assertEqual(4, testApp.controllers[3] instanceof History);
						dohDeferred.callback(true);
					}
				});
				Application(json.fromJson(config));
				return dohDeferred;
			},
			tearDown: function(){
				this._topic.remove();
				// maybe dojox/app should do that?
				delete testApp;
			}
		}
	]);
}
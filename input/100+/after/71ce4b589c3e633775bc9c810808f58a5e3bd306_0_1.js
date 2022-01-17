function(t){
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
			}
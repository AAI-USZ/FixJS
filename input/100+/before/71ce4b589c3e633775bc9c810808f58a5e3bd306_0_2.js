function(t){
				var dohDeferred = new doh.Deferred();
				// stack events that are pushed
				var events = [];
				dohDeferred.addCallback(function(){
					t.assertEqual([1, 2], events);
				});
				topic.subscribe("/app/status", function(evt){
					events.push(evt);
					if(evt == 2){
						// testApp needs to be available at this point
						t.assertNotEqual(null, testApp);
						// test lifecycle methods are available
						t.assertNotNull(testApp.setStatus);
						t.assertNotNull(testApp.getStatus);
						t.assertNotNull(testApp.lifecycle);
						dohDeferred.callback(true);
					}
				});
				Application(json.fromJson(config));
				return dohDeferred;
			}
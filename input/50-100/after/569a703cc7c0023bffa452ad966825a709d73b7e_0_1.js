function(evt){
					if(evt == 2){
						// test controllers
						t.assertEqual(4, testApp.controllers.length);
						t.assertTrue(testApp.controllers[0] instanceof Load);
						t.assertTrue(testApp.controllers[1] instanceof Transition);
						t.assertTrue(testApp.controllers[2] instanceof Layout);
						t.assertTrue(testApp.controllers[3] instanceof History);
						dohDeferred.callback(true);
					}
				}
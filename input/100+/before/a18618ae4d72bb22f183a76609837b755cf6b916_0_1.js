function(){ 
  // 	   autoping : true, // automaticaly ping the server to keep sessions alive
  //       enableidletimer : true, // allows session control via idletimer plugin if present
  //       timeout : 300000, // set the servers session timeout
  //       resource : "spacer.gif", // set the asset to load from the server
  //       promptfor : 10000, // triggers beforetimeout x seconds before session timeout
  //       beforetimeout : $.noop, // callback which occurs prior to session timeout
  //       pollactivity : 1000 // number seconds between checking for user activity (only needed if using idletimer)
	
		describe('Setting an ontimeout callback function', function(){
			it('Should invoke a callback when the time session time remaing is 0', function(){
				var remaining = 1;
				$.fn.sessionTimeout('destroy');
				$.fn.sessionTimeout(
					{	
						timeout: 50,
						promptfor: 0,
						resource: "../src/spacer.gif",
						ontimeout: function(){
							console.log('remaining', $.fn.sessionTimeout('remaining'));
							remaining = $.fn.sessionTimeout('remaining');
							expect(remaining).toEqual(0);
						}
					});	
			})
			it('Should invoke a callback function when session times out', function(){
				$.fn.sessionTimeout('destroy');
				$.fn.sessionTimeout(
					{	
						timeout: 50,
						promptfor: 25,
						resource: "../src/spacer.gif",
						ontimeout: function(){
							timeoutCalled = true;
							expect(timeoutCalled).toBeTruthy();
						}
					});	
			});
			it('Should raise an error if the callback is not a function', function(){
				

				// spyOn('$', 'fn.sessionTimeout').andCallFake(function(options){
				// 	options.ontimeout();
				// })
				// var callback = jasmine.createSpy();

				$.fn.sessionTimeout({	
					timeout: 50,
					promptfor: 25,
					resource: "../src/spacer.gif",
					ontimeout: "I'm not a function"
				})

				waits(75);
				runs(function(){
					expect(function(){
						// $.fn.sessionTimeout('destroy');
						throw new Error('The jQuery.sessionTimeout ontimeout parameter is expecting a function');
					}).toThrow(new Error('The jQuery.sessionTimeout ontimeout parameter is expecting a function'));
				})

			});
		});
	}
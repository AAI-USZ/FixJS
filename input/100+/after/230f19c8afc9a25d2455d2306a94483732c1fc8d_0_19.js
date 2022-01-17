function() {

		if (!h5.core.__compileAspects) {

			expect(1);

			ok(false, 'h5.core.__compileAspectsが公開されていないため、h5.jsでは失敗します。');

			start();

			return;

		}



		var ret = [];

		var controller = {

			__name: 'com.htmlhifive.test.controller.TestController',



			__init: function() {

				ret.push(2);

			}

		};



		var aop1 = {

			interceptors: function(invocation) {

				ret.push(0);

				invocation.proceed();

			}

		};



		var aop2 = {

			interceptors: function(invocation) {

				ret.push(1);

				invocation.proceed();

			}

		};

		h5.core.__compileAspects([aop1, aop2]);



		var testController = h5.core.controller('#controllerTest', controller);

		testController.readyPromise.done(function() {

			start();



			strictEqual(ret.join(';'), '0;1;2', 'インターセプタの動作順は正しいか');



			testController.unbind();

			cleanAspects();

		});



	}
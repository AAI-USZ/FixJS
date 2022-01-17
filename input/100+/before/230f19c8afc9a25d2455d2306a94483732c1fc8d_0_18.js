function() {

		if (!h5.core.__compileAspects) {

			expect(1);

			ok(false, 'h5.core.__compileAspectsが公開されていないため、h5.jsでは失敗します。');

			start();

			return;

		}



		var controller = {

			__name: 'TestController',



			'input[type=button] click': function(context) {

				this.test();

			},



			test: function() {

				window.controller = this;

			}

		};



		var aop1 = {

			interceptors: function(invocation) {

				var rootElement = this.rootElement;

				$(rootElement).append('<div id="aop1"></div>');

				invocation.proceed();

			}

		};



		var aop2 = {

			interceptors: function(invocation) {

				var rootElement = this.rootElement;

				$(rootElement).append('<div id="aop2"></div>');



				invocation.proceed();

			}

		};

		h5.core.__compileAspects([aop1, aop2]);



		var testController = h5.core.controller('#controllerTest', controller);

		testController.readyPromise

				.done(function() {



					$('#controllerTest input[type=button]').click();



					strictEqual(window.controller.__name, 'TestController',

							'コントローラ内のthisはコントローラ自身を指しているか');



					testController.unbind();

					cleanAspects();

					window.controller = undefined;

					strictEqual(window.controller, undefined, '（名前空間のクリーンアップ）');

					start();

				});

	}
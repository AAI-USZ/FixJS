function() {



		var controller = {

			__name: 'TestController',



			'input[type=button] click': function(context) {

				this.test();

			},



			test: function() {

				window.controller = this;

			}

		};

		var testController = h5.core.controller('#controllerTest', controller);

		testController.readyPromise

				.done(function() {



					$('#controllerTest input[type=button]').click();



					strictEqual(window.controller.__name, 'TestController',

							'コントローラ内のthisはコントローラ自身を指しているか');



					testController.unbind();

					window.controller = undefined;

					strictEqual(window.controller, undefined, '（名前空間のクリーンアップ）');

					start();

				});

	}
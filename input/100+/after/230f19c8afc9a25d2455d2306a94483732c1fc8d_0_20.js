function() {



					$('#controllerTest input[type=button]').click();



					strictEqual(window.controller.__name, 'TestController',

							'コントローラ内のthisはコントローラ自身を指しているか');



					testController.unbind();

					cleanAspects();

					window.controller = undefined;

					strictEqual(window.controller, undefined, '（名前空間のクリーンアップ）');

					start();

				}
function() {

		var ret = [];

		var childController = {

			__name: 'ChildController',



			__dispose: function() {

				ret.push(0);

			}

		};

		var controller = {

			__name: 'TestController',



			childController: childController,



			__dispose: function() {

				ret.push(1);

			}

		};

		var testController = h5.core.controller('#controllerTest', controller);

		testController.readyPromise.done(function() {

			var cc = testController.childController;

			var dp = testController.dispose();



			dp.done(function() {



				var rootDispose = true;

				var childDispose = true;

				for ( var p in testController) {

					if (testController[p] !== null) {

						rootDispose = false;

					}

				}

				for ( var p in cc) {

					if (cc[p] !== null) {

						childDispose = false;

					}

				}

				strictEqual(ret.join(';'), '0;1', '__disposeイベントは実行されたか');

				ok(rootDispose, 'ルートコントローラのリソースはすべて削除されたか');

				ok(childDispose, '子コントローラのリソースはすべて削除されたか');

				start();

			});

		});

	}
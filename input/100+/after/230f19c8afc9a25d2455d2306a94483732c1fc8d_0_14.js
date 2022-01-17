function() {

				var flag = false;

				var controller = {



					__name: 'TestController',

					__construct: function() {

						ok(true, 'コンストラクタは実行されること');

					},

					__init: function() {

						ok(true, '__initが実行されること');

					},

					__ready: function() {

						ok(false, 'テスト失敗。__readyが実行された');

						start();

					},

					__dispose: function() {

						ok(!flag, '__disposeが1度だけ実行されること');

						flag = true;

						setTimeout(function() {

							start();

						}, 0);

					},

					__unbind: function() {

						ok(true, '__unbindが実行されること');

					}

				};



				var testController = h5.core.controller('#controllerTest', controller);



				testController.initPromise.done(function() {

					ok(true, 'initPromiseのdoneハンドラが実行されること');

					// dispose()を同期で2回呼べない(disposeメソッドがdisposeされるため)

					// なので、バックアップを取ってdispose.apply(testController)を使って2回呼ぶ

					var dispose = testController.dispose;

					dispose.apply(testController);

					dispose.apply(testController);

				}).fail(function() {

					ok(true, 'テスト失敗。initPromiseのfailハンドラが実行された');

				});

				testController.readyPromise.done(function() {

					ok(false, 'テスト失敗。readyPromiseのdoneハンドラが実行された');

				}).fail(function() {

					ok(true, 'readyPromiseのfailハンドラが実行された');

				});

			}
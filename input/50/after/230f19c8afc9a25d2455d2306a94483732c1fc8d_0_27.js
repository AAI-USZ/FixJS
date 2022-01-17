function() {

					ok(true, 'preinitPromiseのdoneハンドラが実行されること');

					// dispose()を同期で2回呼べない(disposeメソッドがdisposeされるため)

					// なので、バックアップを取ってdispose.apply(testController)を使って2回呼ぶ

					var dispose = testController.dispose;

					dispose.apply(testController);

					dispose.apply(testController);

				}
function() {

		var count = 0;

		var controller = {

			__name: 'TestController',

			__templates: ['./noExistPath'],

			__construct: function(context) {

				deepEqual(++count, 1, '1. コンストラクタが実行される。');

			},

			__init: function(context) {

				ok(false, 'テスト失敗。__initが実行されました。');

			},

			__ready: function(context) {

				ok(false, 'テスト失敗。__readyが実行されました。');

			},

			__dispose: function(context) {

				deepEqual(++count, 4, '4. __disposeが実行される。');

				start();

			},

			__unbind: function(context) {

				deepEqual(++count, 3, '3. __unbindが実行される。');

			}

		};



		var testController = h5.core.controller('#controllerTest', controller);

		testController.preinitPromise.done(function() {

			ok(false, 'テスト失敗。preinitPromiseがresolve()されました。');

		}).fail(function(e) {

			deepEqual(++count, 2, 'preinitPromiseのfailハンドラが実行される。');

			strictEqual(e.controllerDefObject, controller, 'エラーオブジェクトからコントローラオブジェクトが取得できる');

		});

		testController.initPromise.done(function(a) {

			ok(false, 'テスト失敗。initPromiseがresolve()されました。');

		}).fail(function(e, opt) {

			ok(true, 'initPromiseのfailハンドラが実行される');

		});

		testController.readyPromise.done(function(a) {

			ok(false, 'テスト失敗。readyPromiseがresolve()されました。');

		}).fail(function(e, opt) {

			ok(true, 'reaedyPromiseのfailハンドラが実行される');

		});

	}
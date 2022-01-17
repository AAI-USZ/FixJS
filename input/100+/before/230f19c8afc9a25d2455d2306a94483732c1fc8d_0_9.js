function() {

		// TODO エラーコードも確認する

		var errorCode = 7003;

		var disposedController = {};

		var bController = {

			__name: 'BController',



			__construct: function(context) {

				ok(true, '孫コントローラのコンストラクタが実行される。');

				this.preinitPromise.done(function() {

					ok(true, '孫コントローラのpreinitPromiseのdoneハンドラが呼ばれる。');

				}).fail(function() {

					ok(false, 'テスト失敗。孫コントローラのpreinitPromiseのfailハンドラが呼ばれた。');

				});

				this.initPromise.done(function() {

					ok(true, '孫コントローラのinitPromiseのdoneハンドラが呼ばれる。');

				}).fail(function() {

					ok(false, 'テスト失敗。孫コントローラのinitPromiseのfailハンドラが呼ばれた。');

				});

				this.readyPromise.done(function() {

					ok(false, 'テスト失敗。孫コントローラのreadyPromiseのdoneハンドラが呼ばれた。');

					start();

				}).fail(function() {

					ok(true, '孫コントローラのreadyPromiseのfailハンドラが呼ばれる。');

				});



			},

			__init: function(context) {

			// 孫の__initは、その前にコントローラ群がdisposeされていれば実行されない

			},

			__ready: function(context) {

			// 孫の__readyは、その前にコントローラ群がdisposeされていれば実行されない

			},

			__dispose: function(context) {

				ok(true, '孫コントローラの__disposeが実行される。');

				disposedController.b = this;

			},

			__unbind: function(context) {

				ok(true, '孫コントローラの__unbindが実行される。');

			}

		};

		var aController = {

			__name: 'AController',

			__templates: '/noExistPath',

			childController: bController,



			__construct: function(context) {

				ok(true, '子コントローラのコンストラクタが実行される。');

				this.preinitPromise.done(function() {

					ok(false, 'テスト失敗。子コントローラのpreinitPromiseのdoneハンドラが呼ばれた。');

				}).fail(function() {

					ok(true, '子コントローラのpreinitPromiseのfailハンドラが呼ばれる。');

				});

				this.initPromise.done(function() {

					ok(false, 'テスト失敗。子コントローラのinitPromiseのdoneハンドラが呼ばれた。');

				}).fail(function() {

					ok(true, '子コントローラのinitPromiseのfailハンドラが呼ばれる。');

				});

				this.readyPromise.done(function() {

					ok(false, 'テスト失敗。子コントローラのreadyPromiseのdoneハンドラが呼ばれた。');

				}).fail(function() {

					ok(true, '子コントローラのreadyPromiseのfailハンドラが呼ばれる。');

				});

			},

			__init: function(context) {

				ok(false, 'テスト失敗。子コントローラの__initが実行されました。');

			},

			__ready: function(context) {

				ok(false, 'テスト失敗。子コントローラの__readyが実行されました。');

			},

			__dispose: function(context) {

				ok(true, '子コントローラの__disposeが実行される。');

				disposedController.a = this;

			},

			__unbind: function(context) {

				ok(true, '子コントローラの__unbindが実行される。');

			}

		};



		var controller = {

			__name: 'TestController',

			__templates: ['./template/test2.ejs'],

			childController: aController,



			__construct: function(context) {

				ok(true, '親コントローラのコンストラクタが実行される。');

			},

			__init: function(context) {

				ok(false, 'テスト失敗。親コントローラの__initが実行されました。');

			},

			__ready: function(context) {

				ok(false, 'テスト失敗。親コントローラの__readyが実行されました。');

			},

			__dispose: function(context) {

				ok(true, '親コントローラの__disposeが実行される。');

				disposedController.test = this;

				setTimeout(function() {

					for ( var i = 0; i < 3; i++) {

						var prop = ['b', 'a', 'test'][i];

						var str = ['孫', '子', '親'][i];

						var flag = 0;

						for ( var p in disposedController[prop]) {

							if (disposedController[prop][p] !== null) {

								flag = 1;

								break;

							}

						}

						ok(!flag, str + 'コントローラがdisposeされていること');

					}

					start();

				}, 0);

			},

			__unbind: function(context) {

				ok(true, '親コントローラの__unbindが実行される。');

			}

		};



		var testController = h5.core.controller('#controllerTest', controller);

		testController.preinitPromise.done(function() {

			ok(true, '親コントローラのpreinitPromiseのdoneハンドラが呼ばれる。');

		}).fail(function() {

			ok(false, 'テスト失敗。親コントローラのpreinitPromiseのfailハンドラが呼ばれた。');

		});

		testController.initPromise.done(function() {

			ok(false, 'テスト失敗。親コントローラのinitPromiseのdoneハンドラが呼ばれた。');

		}).fail(function() {

			ok(true, '親コントローラのinitPromiseのfailハンドラが呼ばれる。');

		});

		testController.readyPromise.done(function() {

			ok(false, 'テスト失敗。親コントローラのreadyPromiseのdoneハンドラが呼ばれた。');

		}).fail(function() {

			ok(true, '親コントローラのreadyPromiseのfailハンドラが呼ばれる。');

		});

	}
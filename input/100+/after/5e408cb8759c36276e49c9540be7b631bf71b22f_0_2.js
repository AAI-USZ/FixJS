function(controllerInstance) {

			var isLeafController = true;

			for ( var prop in controllerInstance) {

				// 子コントローラがあれば再帰的に処理

				if (isChildController(controllerInstance, prop)) {

					isLeafController = false;

					execInner(controllerInstance[prop]);

				}

			}



			// 子孫コントローラの準備ができた時に実行させる関数を定義

			var func = function() {

				var ret = null;

				var lifecycleFunc = controllerInstance[funcName];

				if (lifecycleFunc) {

					ret = controllerInstance[funcName]

							(createInitializationContext(controllerInstance));

				}

				// ライフサイクルイベント実行後に呼ぶべきコールバック関数を作成

				var callback = isInitEvent ? createCallbackForInit(controllerInstance)

						: createCallbackForReady(controllerInstance);

				if (h5.async.isPromise(ret)) {

					ret.done(function() {

						callback();

					}).fail(function(/* var_args */) {

						fwLogger.warn(MESSAGE_LIFECYCLE_ERROR);

						controller.rootController.dispose();

					});

				} else {

					callback();

				}

			};

			// getPromisesForXXXの戻り値が空の配列の場合はfunc()は同期的に呼ばれる

			var promises = isInitEvent ? getPromisesForInit(controllerInstance)

					: getPromisesForReady(controllerInstance);

			if (isInitEvent && isLeafController) {

				promises.push(leafPromise);

			}

			h5.async.when.apply(h5.async, promises).done(function() {

				func();

			});

		}
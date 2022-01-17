function() {

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

				}
function() {

						ok(!flag, '__disposeが1度だけ実行されること');

						flag = true;

						setTimeout(function() {

							start();

						}, 0);

					}
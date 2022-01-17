function() {



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

			}
function() {

				// this.dispose()を同期で2回呼べない(disposeメソッドがdisposeされるため)

				// なので、バックアップを取ってdispose.apply(this)を使って2回呼ぶ

				var dispose = this.dispose;

				dispose.apply(this);

				dispose.apply(this);

				ok(true, '__initが実行されること');

			}
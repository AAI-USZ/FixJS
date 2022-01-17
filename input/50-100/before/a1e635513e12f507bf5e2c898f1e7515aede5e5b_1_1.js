function() {
			var cancel = false;
			if (callback) {
				cancel = callback();
			}

			if (cancel) {
				return;
			}

			dojo.disconnect(handle);
			dojo.disconnect(handle2);

			myDialog.destroyRecursive();
		}
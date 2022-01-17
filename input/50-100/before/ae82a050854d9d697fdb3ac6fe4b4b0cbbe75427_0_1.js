function() {
			var cancel = false;
			if (callback) {
				cancel = callback();
			}

			if (cancel) {
				return;
			}

			dojo.forEach(handles, function(handle){dojo.disconnect(handle)});

			myDialog.destroyRecursive();
		}
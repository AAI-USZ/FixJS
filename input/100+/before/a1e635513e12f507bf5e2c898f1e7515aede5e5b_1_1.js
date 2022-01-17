function(content, title, style, callback) {
		var myDialog = new ResizeableDialog({
			title: title,
			content: content,
			contentStyle: style
		});

		var handle = dojo.connect(myDialog, "onExecute", content, function() {
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
		});

		var handle2 = dojo.connect(content, "onClose", content, function() {
			dojo.disconnect(handle);
			dojo.disconnect(handle2);

			myDialog.destroyRecursive();
		});

		myDialog.show();

		return myDialog;
	}
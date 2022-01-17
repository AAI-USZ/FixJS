function(content, title, style, callback) {
		var handles = [];

		var myDialog = new ResizeableDialog({
			title: title,
			content: content,
			contentStyle: style
		});

		handles.push(dojo.connect(myDialog, "onExecute", content, function() {
			var cancel = false;
			if (callback) {
				cancel = callback();
			}

			if (cancel) {
				return;
			}

			dojo.forEach(handles, function(handle){dojo.disconnect(handle)});

			myDialog.destroyRecursive();
		}));

		function _destroy() {
			dojo.forEach(handles, function(handle){dojo.disconnect(handle)});

			myDialog.destroyRecursive();
		}

		handles.push(dojo.connect(content, "onClose", function() {
			_destroy();
		}));

		// handle the close button
		handles.push(dojo.connect(myDialog, "onCancel", function() {
			_destroy();
		}));

		myDialog.show();

		return myDialog;
	}
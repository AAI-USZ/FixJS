function(title, content, style, callback, okLabel, hideCancel) {
		var myDialog, handle;

		function _onCancel() {
			dojo.disconnect(handle);

			myDialog.destroyRecursive();
		}

		// construct the new contents
		var newContent = document.createElement("div");

		var dialogContents = document.createElement("div");
		dojo.addClass(dialogContents, "dijitDialogPaneContentArea");
		if (dojo.isString(content)) {
			dialogContents.innerHTML = content;
		} else {
			dialogContents.appendChild(content.domNode);
		}
		newContent.appendChild(dialogContents);
	
		var dialogActions = document.createElement("div");
		dojo.addClass(dialogActions, "dijitDialogPaneActionBar");
		dialogActions.appendChild(new Button({label: okLabel ? okLabel : veNLS.ok, type: "submit"}).domNode);

		if (!hideCancel) {
			dialogActions.appendChild(new Button({label: veNLS.cancel, onClick: _onCancel}).domNode);
		}

		newContent.appendChild(dialogActions);

		myDialog = new ResizeableDialog({
			title: title,
			content: newContent,
			contentStyle: style
		});
		var handle;

		var handle = dojo.connect(myDialog, "onExecute", function() {
			if (callback) {
				callback();
			}

			_onCancel();
		});

		myDialog.show();

		return myDialog;
	}
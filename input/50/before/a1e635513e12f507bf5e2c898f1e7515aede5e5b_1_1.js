function _onCancel() {
			dojo.disconnect(handle);

			myDialog.destroyRecursive();
		}
function(objectId) {
		var elName = this.parseObjectId('full', objectId, 2, 0, true) + '[hidden]';
		var formObj = document.getElementsByName(elName + '_0');
		var valueObj = document.getElementsByName(elName);
		var icon = $(objectId + '_disabled');

			// It might be the case that there's no hidden field
		if (formObj.length && valueObj.length) {
			formObj[0].click();
			valueObj[0].value = formObj[0].checked ? 1 : 0;
			TBE_EDITOR.fieldChanged_fName(elName, elName);
		}

		if (icon) {
			if (icon.hasClassName('t3-icon-edit-hide')) {
				icon.removeClassName ('t3-icon-edit-hide');
				icon.addClassName('t3-icon-edit-unhide');
			} else {
				icon.removeClassName ('t3-icon-edit-unhide');
				icon.addClassName('t3-icon-edit-hide');
			}
		}

		return false;
	}
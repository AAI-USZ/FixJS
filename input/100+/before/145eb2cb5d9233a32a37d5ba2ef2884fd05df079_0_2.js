function(objectId) {
		var elName = this.parseObjectId('full', objectId, 2, 0, true);
		var currentUid = this.parseObjectId('none', objectId, 1);
		var objectPrefix = this.parseObjectId('full', objectId, 0, 1);
		var formObj = document.getElementsByName(elName+'[hidden]_0')[0];

		formObj.click();

		document.getElementsByName(elName+'[hidden]')[0].value = formObj.checked?1:0;
		TBE_EDITOR.fieldChanged(objectPrefix,'1','hidden',elName+'[hidden]');

		if($(objectId+'_disabled').hasClassName('t3-icon-edit-hide')) {
			$(objectId+'_disabled').removeClassName ('t3-icon-edit-hide');
			$(objectId+'_disabled').addClassName('t3-icon-edit-unhide');
		} else {
			$(objectId+'_disabled').removeClassName ('t3-icon-edit-unhide');
			$(objectId+'_disabled').addClassName('t3-icon-edit-hide');
		}

		return false;
	}
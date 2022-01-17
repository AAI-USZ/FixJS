function(objectId, objectPrefix, expandSingle, htmlData) {
		var hiddenValue, formObj, valueObj;
		var objectDiv = $(objectId + '_fields');
		if (!objectDiv || objectDiv.innerHTML.substr(0,16) != '<!--notloaded-->')
			return;

		var elName = this.parseObjectId('full', objectId, 2, 0, true);

		formObj = document.getElementsByName(elName + '[hidden]_0');
		valueObj = document.getElementsByName(elName + '[hidden]');

			// It might be the case that a child record
			// cannot be hidden at all (no hidden field)
		if (formObj.length && valueObj.length) {
			hiddenValue = formObj[0].checked;
			formObj[0].remove();
			valueObj[0].remove();
		}

			// Update DOM
		objectDiv.update(htmlData);

		formObj = document.getElementsByName(elName + '[hidden]_0');
		valueObj = document.getElementsByName(elName + '[hidden]');

			// Set the hidden value again
		if (formObj.length && valueObj.length) {
			valueObj[0].value = hiddenValue ? 1 : 0;
			formObj[0].checked = hiddenValue;
		}

			// remove loading-indicator
		if ($(objectId + '_icon')) {
			$(objectId + '_iconcontainer').removeClassName('loading-indicator');
			$(objectId + '_icon').show();
		}
			// now that the content is loaded, set the expandState
		this.expandCollapseRecord(objectId, expandSingle);
	}
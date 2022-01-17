function(objectId, objectPrefix, expandSingle, htmlData) {
		var objectDiv = $(objectId + '_fields');
		if (!objectDiv || objectDiv.innerHTML.substr(0,16) != '<!--notloaded-->') {
			return;
		}

		var elName = this.parseObjectId('full', objectId, 2, 0, true);

		var formObj = document.getElementsByName(elName+'[hidden]_0')[0];
		var tempHiddenValue = formObj.checked;
		formObj.remove();
		document.getElementsByName(elName+'[hidden]')[0].remove();

		objectDiv.update(htmlData);
		document.getElementsByName(elName+'[hidden]')[0].value = tempHiddenValue ? 1 : 0;
		document.getElementsByName(elName+'[hidden]_0')[0].checked = tempHiddenValue;

			// remove loading-indicator
		if ($(objectId + '_icon')) {
			$(objectId + '_iconcontainer').removeClassName('loading-indicator');
			$(objectId + '_icon').show();
		}
			// now that the content is loaded, set the expandState
		this.expandCollapseRecord(objectId, expandSingle);
	}
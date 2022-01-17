function(objectId, expandSingle, returnURL) {
		var currentUid = this.parseObjectId('none', objectId, 1);
		var objectPrefix = this.parseObjectId('full', objectId, 0, 1);

			// if content is not loaded yet, get it now from server
		if(($(objectId+'_fields') && $("irre-loading-indicator"+objectId)) || inline.isLoading) {
			return false;
		} else if ($(objectId+'_fields') && $(objectId+'_fields').innerHTML.substr(0,16) == '<!--notloaded-->') {
			inline.isLoading = true;
				// add loading-indicator
			if ($(objectId + '_icon')) {
				$(objectId + '_icon').hide();
				$(objectId + '_iconcontainer').addClassName('loading-indicator');
			}
			return this.getRecordDetails(objectId, returnURL);
		}

		var currentState = '';
		var collapse = new Array();
		var expand = new Array();

			// if only a single record should be visibly for that set of records
			// and the record clicked itself is no visible, collapse all others
		if (expandSingle && !Element.visible(objectId+'_fields')) {
			collapse = this.collapseAllRecords(objectId, objectPrefix, currentUid);
		}

		Element.toggle(objectId+'_fields');
		currentState = Element.visible(objectId+'_fields') ? 1 : 0

		if (this.isNewRecord(objectId)) {
			this.updateExpandedCollapsedStateLocally(objectId, currentState);
		} else if (currentState) {
			expand.push(currentUid);
		} else if (!currentState) {
			collapse.push(currentUid);
		}

		this.setExpandedCollapsedState(objectId, expand.join(','), collapse.join(','));

		return false;
	}
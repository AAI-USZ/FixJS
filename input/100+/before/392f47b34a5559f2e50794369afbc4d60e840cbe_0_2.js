function(objectId, objectPrefix, callingUid) {
			// get the form field, where all records are stored
		var objectName = this.prependFormFieldNames+this.parseObjectId('parts', objectId, 3, 2, true);
		var formObj = document.getElementsByName(objectName);
		var collapse = [];

		if (formObj.length) {
				// the uid of the calling object (last part in objectId)
			var recObjectId = '';

			var records = formObj[0].value.split(',');
			for (var i=0; i<records.length; i++) {
				recObjectId = objectPrefix + this.structureSeparator + records[i];
				if (records[i] != callingUid && Element.visible(recObjectId+'_fields')) {
					Element.hide(recObjectId+'_fields');
					if (this.isNewRecord(recObjectId)) {
						this.updateExpandedCollapsedStateLocally(recObjectId, 0);
					} else {
						collapse.push(records[i]);
					}
				}
			}
		}

		return collapse;
	}
function(listItem, data) {
		data = data || { };
		var $objectIDs = [];
		$.each(listItem.data('parameters').objectIDs, function(index, objectID) {
			$objectIDs.push(parseInt(objectID));
		});
		
		new WCF.Action.Proxy({
			autoSend: true,
			data: {
				actionName: listItem.data('parameters').actionName,
				className: listItem.data('parameters').className,
				objectIDs: $objectIDs,
				parameters: {
					data: data
				}
			},
			success: $.proxy(function(data) {
				listItem.trigger('clipboardActionResponse', [ data, listItem.data('type'), listItem.data('actionName'), listItem.data('parameters') ]);
				
				this._loadMarkedItems();
			}, this)
		});
		
		if (this._actionObjects[listItem.data('objectType')] && this._actionObjects[listItem.data('objectType')][listItem.data('parameters').actionName]) {
			this._actionObjects[listItem.data('objectType')][listItem.data('parameters').actionName].triggerEffect($objectIDs);
		}
	}
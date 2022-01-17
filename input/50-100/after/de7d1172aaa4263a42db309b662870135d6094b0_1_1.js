function(update) {
		var update
		if( update == null ) {
			OpenMEAP.updates.onNoUpdate();
			return;
		}
		if( typeof update.error == 'object' ) {
			OpenMEAP.updates.onCheckError(update.error);
			return;
		}
		if( OpenMEAP.updates.onAvailable(update) ) {
			OpenMEAP.performUpdate(update,function(data) {
				OpenMEAP.updates.onStateChange(data);
			});
		}
	}
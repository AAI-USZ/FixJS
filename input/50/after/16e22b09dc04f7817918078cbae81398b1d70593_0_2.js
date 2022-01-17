function onError(err){ // on error callback
		 	updateToGpsForm('Err', 'Err', 'Err', 'Err');
		 	Ext.Msg.alert('Error', 'Failed when requesting GEO Location.' + '\n' + ' code: ' + err.code + '\n' + 'msg: ' + err.message, Ext.emptyFn);
		 }
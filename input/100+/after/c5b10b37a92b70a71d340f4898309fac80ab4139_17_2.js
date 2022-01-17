function loadMinnowView(){
	console.log('got all snapshot parts, loading minnow');
	/*
	var sendFacade = {
		editBuffer: [],
		persistEdit: function(typeCode, id, path, edit){
			sendFacade.editBuffer.push([typeCode, id, path, edit]);
		}
	};*/
	
	snapshot = mergeSnapshots(snaps);
	
	console.log('version loaded: ' + snapshot.version);

	var host = window.location.protocol + '//' + window.location.host// + ':' + minnowSocketPort
	var viewName = schema._byCode[baseTypeCode].name

	update.establishSocket(applicationName, schema, host, function(syncHandle){
		syncHandle._openViewWithSnapshots(baseTypeCode, snapshot.version, snaps, viewName, mainViewParams, function(root){

			getRoot = function(){return root;}
			
			console.log('got main view api')
			api = root
		
			//domready.domready(function(){
			//	console.log('dom ready')
				listeners.forEach(function(listener){
					listener(root);
				});
			//});

		})
	})
}
function loadMinnowView(){
	console.log('got all snapshot parts, loading minnow');
	
	var sendFacade = {
		editBuffer: [],
		persistEdit: function(typeCode, id, path, edit){
			sendFacade.editBuffer.push([typeCode, id, path, edit]);
		}
	};
	
	snapshot = mergeSnapshots(snaps);
	
	console.log('version loaded: ' + snapshot.version);
	
	api = makeSyncApi(schema, sendFacade, snapshot, baseTypeCode, baseId);
	api.setEditingId(syncId);

	function readyCb(){	
		root = api.getRoot();
		getRoot = function(){return root;}
		
		domready(function(){
			_.each(listeners, function(listener){
				listener(root);
			});
		});
	}
	
	var now = Date.now();
	if(snapshot.version === lastId){
		readyCb();
		setTimeout(function(){
			establishSocket(sendFacade, function(){
				console.log('...connected lazily after ' + (Date.now() - now) + 'ms.');
			});
		}, 3000);
	}else{
		establishSocket(sendFacade, readyCb);
	}
}
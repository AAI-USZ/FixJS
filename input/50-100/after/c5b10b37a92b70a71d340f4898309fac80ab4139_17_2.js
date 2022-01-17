function(syncHandle){
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
	}
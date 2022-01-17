function readyCb(){	
		root = api.getRoot();
		getRoot = function(){return root;}
		
		domready(function(){
			_.each(listeners, function(listener){
				listener(root);
			});
		});
	}
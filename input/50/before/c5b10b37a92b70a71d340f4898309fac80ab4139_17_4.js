function(){
			_.each(listeners, function(listener){
				listener(root);
			});
		}
function(e){
			logger.warn("[agent] No connection found. " + e.message());
			hooks.trigger('no_conection');
			if(callback) callback(false);
		}
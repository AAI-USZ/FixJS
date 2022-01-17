function(callback){

		logger.info('[agent] Checking connection...');

		var no_connection = function(e){
			logger.warn("[agent] No connection found. " + e.toString());
			hooks.trigger('no_conection');
			if(callback) callback(false);
		}

		var options = config.proxy.enabled ? config.proxy : {};

		connection.check(options, function(err){

			if(!err){

				program.connection_found = true;
				hooks.trigger('connection_found');
				if(callback) callback(true);

			} else if(self.auto_connect_attempts++ < config.auto_connect_attempts){

				logger.notice("[agent] Trying to connect to an open Wifi network...");

				common.os.auto_connect(function(e){

					if(e) return no_connection(e);

					setTimeout(function(){
						self.check_connection(callback);
					}, config.auto_connect_timeout || 10000); // ten seconds to connect

				});

			} else {

				no_connection(err);

			}

		});

	}
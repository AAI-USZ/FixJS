function(err, loaded_module){

					var module_opts = hash[requested_module];

					if(err)
						logger.error(err);
					else {
						if(typeof module_opts == 'object') loaded_module.options = module_opts;
						loaded_modules.push(loaded_module);
					}

					--count || callback(loaded_modules);

				}
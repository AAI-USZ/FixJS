function createChild(/** {Object|String}? */ mixin) {
				var spec, config;

				spec = mixin ? [].concat(module, mixin) : module;
				config = { init: init };

				if(!(defer || get)) {
					config.ready = ready;
				}

				return wireChild(spec, config);
			}
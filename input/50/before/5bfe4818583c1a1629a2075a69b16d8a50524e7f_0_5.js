function createChild(/** {Object|String}? */ mixin) {
				var spec = mixin ? [].concat(module, mixin) : module;

				return wireChild(spec, { init: init });
			}
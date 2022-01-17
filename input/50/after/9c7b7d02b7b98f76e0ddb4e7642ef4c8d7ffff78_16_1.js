function(value, key) {

				key = PLUGIN_NAME + '_' + key;



				if (settings[key] === undefined)

					settings[key] = value;

			}
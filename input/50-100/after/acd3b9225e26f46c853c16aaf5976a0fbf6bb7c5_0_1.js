function(json) {
					_deviceDetailsDb = jQuery.parseJSON(json);
					if (typeof _deviceDetailsDb["os_versions"] !== 'undefined') {
						_deviceDetailsDb["os_versions"] = _deviceDetailsDb["os_versions"].join(",").replace(/\./g, ":").split(",");
					}
				}
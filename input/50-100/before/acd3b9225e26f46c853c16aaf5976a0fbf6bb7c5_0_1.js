function(json) {
					_deviceDetailsDb = jQuery.parseJSON(json);
					_deviceDetailsDb["os_versions"] = _deviceDetailsDb["os_versions"].join(",").replace(/\./g, ":").split(",");
				}
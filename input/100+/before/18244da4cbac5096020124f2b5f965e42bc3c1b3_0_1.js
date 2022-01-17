function(service, data, successCallback, exceptionCallback, methodType) {
		var config = {
			dataType: 'json'
		};

		var argLength = arguments.length;

		var lastArg = arguments[argLength - 1];

		var method;

		if (argLength >= 1 && Lang.isObject(lastArg, true)) {
			methodType = lastArg.method || null;

			method = methodType;
		}

		if (service) {
			var serviceData = data;

			if (Lang.isObject(service, true)) {
				var serviceConfig = service;

				var ioConfig = serviceConfig.io;

				if (ioConfig) {
					A.mix(config, ioConfig, true);

					delete serviceConfig.io;
				}

				for (var i in serviceConfig) {
					if (A.Object.owns(serviceConfig, i)) {
						service = i;
						serviceData = serviceConfig[i];

						break;
					}
				}
			}

			if (data) {
				var typeString = Lang.isString(data);

				if (!typeString && Lang.isFunction(data)) {
					if (Lang.isFunction(successCallback)) {
						exceptionCallback = successCallback;
					}

					successCallback = data;

					serviceData = null;
				}
				else if (typeString || (data.nodeType || data._node)) {
					var formConfig = A.namespace.call(config, 'form');

					if (typeString) {
						data = data.replace(REGEX_SELECTOR_ID, '');
					}

					formConfig.id = data._node || data;

					serviceData = null;
				}
			}

			config.data = serviceData;

			if (Liferay.PropsValues.NTLM_AUTH_ENABLED && Liferay.Browser.isIe()) {
				method = 'GET';
			}

			var callbackConfig = A.namespace.call(config, 'on');

			if (!Lang.isFunction(successCallback)) {
				successCallback = null;
			}

			if (!Lang.isFunction(exceptionCallback)) {
				exceptionCallback = null;
			}

			if (!callbackConfig.success && successCallback) {
				callbackConfig.success = function(event) {
					var responseData = this.get('responseData');

					if ((!responseData || responseData.exception) && exceptionCallback) {
						var exception = responseData ? responseData.exception : 'The server returned an empty response';

						exceptionCallback.call(this, exception, responseData);
					}
					else {
						successCallback.call(this, responseData);
					}
				};
			}
		}

		if (service) {
			service = service.replace(REGEX_TRIM_SLASH, '');
		}

		if (!service) {
			throw 'You must specify a service.';
		}

		var pieces = service.split('#');

		var url;

		if (pieces.length > 1) {
			url = Lang.sub(Service.PLUGIN_URL_BASE, pieces);
		}
		else {
			url = Service.URL_BASE + service;
		}

		if (String(method).toUpperCase() == 'GET') {
			config.cache = false;
		}

		config.method = method;

		return Service._ioRequest(url, config);
	}
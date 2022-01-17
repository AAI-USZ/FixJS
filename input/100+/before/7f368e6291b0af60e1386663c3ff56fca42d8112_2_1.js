function extendParameters(service) {
			function get(which) {
				if (service) {
					var value;
					if (qualifier) {
						if (service[which] && typeof service[which] === 'object') {
							value = service[which][qualifier];
						}
					}
					if (!value) {
						value = service[which];
					}
					return value;					
				}
			}			

			protocol = get('protocol') || protocol;
			baseUrl = get('baseUrl') || baseUrl;
			extendedUrl = get('extendedUrl') || extendedUrl;
			resourceName = get('resourceName') || resourceName;
			method = get('method') || method;
			// which parameters should go into the URL for POST/PUT
			urlParameterKeys = get('urlParameterKeys') || urlParameterKeys;

			username = get('username') || username;
			password = get('password') || password;

			headers = get('headers') || headers;
			proxy = get('proxy') || proxy;

			parameterSchema = get('parameterSchema') || parameterSchema;
			responseSchema = get('responseSchema') || responseSchema;

			F5.extend(parameters, get('parameters'));			
		}
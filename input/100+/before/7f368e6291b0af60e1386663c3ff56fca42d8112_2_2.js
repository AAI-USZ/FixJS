function (node, id, parameters, cb) {

		if (!node.pending) {
			node.pending = [];
		}

		// check for connection
		// TODO: connection test for headless mode
		if (F5.connection && !F5.connection.online()) {
			// TODO: make this message configurable from client
			F5.alert('Oops! No Network Connection', "Please enable your network connection and try again.", function () {
				cb(null);				
			});
			return;
		}				

		// get the parameters
		var components = id.split(':');
		var name = components[0];
		var qualifier = components[1];

		var protocol = 'http', method = 'GET', baseUrl, username, password, 
			urlParameterKeys, extendedUrl, resourceName, headers, proxy, parameterSchema, responseSchema;

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

		var service = F5.valueFromId(F5.Services, F5.getNodePackage(node));		
		extendParameters(service);						
		F5.forEach(name.split('.'), function (component) {
			service = service && service[component];
			if (service) {
				extendParameters(service);										
			}
		});			
		// try at global scope (fully qualified service id)
		if (!service) {
			service = F5.Services;
			extendParameters(service);						
			F5.forEach(name.split('.'), function (component) {
				service = service && service[component];
				if (service) {
					extendParameters(service);										
				}
			});
		}

		F5.assert(service, 'No service called: ' + name);		

		var url = baseUrl ? (protocol + '://' + baseUrl) : '';
		if (extendedUrl) {
			url += extendedUrl;
		}

		function validate(obj, schemaName) {
			var uri = F5.getNodePackage(node) + '#' + schemaName;
			var schema = F5.JSV.env.findSchema(uri);
			console.log(uri);
			console.log(schema);
			var report = F5.JSV.env.validate(obj, schema);
			F5.assert(report.errors.length === 0,
				'Error validating service parameter schema: ' + 
					JSON.stringify(obj) + ' : ' +
					JSON.stringify(report.errors));

		}

		// NOTE: url parameters for substitution are considered to be part of the schema
		if (F5.isDebug()) {
			if (parameterSchema) {
				validate(parameters, parameterSchema);
			}
		}		

		// TODO: obsolete. use component replacement below 
		if (resourceName) {
			url += '/' + resourceName;
		}

		// DO URL path component replacement
		F5.forEach(parameters, function (id, value) {
			var key = '<' + id + '>';
			if (url.match(key)) {
				url = url.replace(key, value);
				delete parameters[id];
			}
		});		

		var pending = {abort: function () {
//			console.log('aborting pending')
			if (this.xhr.readyState !== this.xhr.DONE) {
				this.aborted = true;
				this.xhr.abort();				
			}
		}};

		var timeoutMS = 10000;
		function timeout() {
			var title = "A network operation is taking a long time.";
			var message = "Press OK to keep waiting or Cancel to cancel the operation.";
			// TODO: should move this up to the DOM aware layer
			if (F5.confirm) {
				pending.confirmWidget = F5.confirm(title, message, function (result) {
								if (result) {
									if (pending.timeout) {
										pending.timeout = setTimeout(timeout, timeoutMS);									
									}
								} else {
									pending.abort();
								}
								delete pending.confirmWidget;
							});				
			} else {
				console.log(title + ' ' + message);
				pending.timeout = setTimeout(timeout, timeoutMS);				
			}
		}					

		// TODO: might also want to allow cancelling if there's no node (currently only done from tools)
		pending.timeout = setTimeout(timeout, timeoutMS);
		
		function formatUrlParameters(parameters, keys) {
			var urlParameters = [];
			F5.forEach(parameters, function (id, value) {
				if (!keys || keys.indexOf(id) !== -1) {
					urlParameters.push(id + '=' + encodeURIComponent(value));					
				}
			});
			if (urlParameters.length) {
				return '?' + urlParameters.join('&');				
			} else {
				return '';
			}			
		}					

		networkActivityStarted();
		if (method === 'GET' || method === 'DELETE') {			
			url += formatUrlParameters(parameters);


			if (proxy) {
				url = proxy + '/proxy?url=' + encodeURIComponent(url);
			}

//			console.log(url);	

			pending.xhr = F5.doXHR(method, url, null,
				function success(response, status) {
					networkActivityCompleted();
					
					pendingComplete(node, pending);

					if (F5.isDebug() && responseSchema) {
						validate(JSON.parse(response), responseSchema);
					}

					try {
//						console.log(response);
						var obj = JSON.parse(response);												
						if (service.postprocess) {
							obj = service.postprocess(obj);
						}
						try {
							cb(obj, status);							
						} catch (e1) {
							console.log(e1.message);
						}
						// TODO: validateSchema(response, service.responseSchema);						
					} catch (e2) {
						console.log(e2.message);
						F5.networkErrorHandler(cb, url, e2.message);						
					}
				}, function error(response, status) {
					networkActivityCompleted();
					
					pendingComplete(node, pending);						
					if (pending.aborted) {
						cb(); 
					} else {
						F5.networkErrorHandler(cb, url, status);
					}			
				}, headers, username, password);
		} else if (method === 'POST' || method === 'PUT'){	

			var bodyParameters = {};
			F5.forEach(parameters, function (id, value) {
				if (!urlParameterKeys || urlParameterKeys.indexOf(id) === -1) {
					bodyParameters[id] = value;
					delete parameters[id];
				}
			});

			url += formatUrlParameters(parameters, urlParameterKeys);			

			if (proxy) {
				url = proxy + '/proxy?url=' + encodeURIComponent(url);
			}

			pending.xhr = F5.doXHR(method, url, JSON.stringify(bodyParameters),
				function success(response, status) {
					networkActivityCompleted();
					
					pendingComplete(node, pending);		

					if (F5.isDebug() && responseSchema) {
						validate(JSON.parse(response), responseSchema);
					}

					try {
//						console.log(response);
						var obj = JSON.parse(response);

						if (F5.isDebug() && responseSchema) {
							validate(obj, responseSchema);
						}

						if (service.postprocess) {
							obj = service.postprocess(obj);
						}
						try {
							cb(obj, status);							
						} catch (e1) {
							console.log(e1.message);
						}
						// TODO: validateSchema(response, service.responseSchema);						
					} catch (e2) {
						console.log(e2.message);
						F5.networkErrorHandler(cb, url, e2.message);						
					}
				}, function error(response, status) {
					networkActivityCompleted();
					
					pendingComplete(node, pending);	
					if (pending.aborted) {
						cb();
					} else {
						F5.networkErrorHandler(cb, url, status);						
					}			
				}, headers, username, password);							
		}	

		node.pending.push(pending);			
	}
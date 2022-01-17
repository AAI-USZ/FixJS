function (response) {
				if (!(response.headers && response.headers['Content-Type'] && response.entity)) {
					return response;
				}

				var mime, serializer, responseReady;

				mime = response.headers['Content-Type'];

				responseReady = when.defer();
				serializer = registry.lookup(mime);

				when(serializer, function (serializer) {
					response.entity = serializer.read(response.entity);
					responseReady.resolve(response);
				});

				return responseReady.promise;
			}
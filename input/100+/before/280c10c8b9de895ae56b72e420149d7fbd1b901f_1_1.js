function (response) {
				var mime, serializer, responseReady;

				mime = response.headers['Content-Type'];

				if (!(mime && response.entity)) {
					return response;
				}
				else {
					responseReady = when.defer();
					serializer = registry.lookup(mime);

					when(serializer, function (serializer) {
						response.entity = serializer.read(response.entity);
						responseReady.resolve(response);
					});

					return responseReady.promise;
				}
			}
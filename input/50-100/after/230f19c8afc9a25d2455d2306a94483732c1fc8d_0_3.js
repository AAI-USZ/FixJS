function() {

			var dfd = h5.async.deferred();

			var e = {

				detail: {

					error: {

						status: h5.env.ua.isIE ? 0 : 12029

					}

				}

			};

			if (retryCount++ == retryLimit) {

				dfd.resolve();

			} else {

				dfd.reject(e);

			}

			return dfd.promise();

		}
function(data) {

				if (data && data.errorMessage) {

					// handle an error message here

					$.shout("caught-error-message", data);

					if (data.operation) {

						// so we now have an operation to perform before we

						// continue with the user

						// function if at all... the userFunction if what should

						// be called if we have

						// succeeded, but here we have no data, so we need to

						// call ourselve recursively

						$

								.shout(data.operation.replace(/_/g, "-")

										.toLowerCase(), {

									message : data.errorMessage,

									callback : function() {

										$.getSafe(url, userFunction);

									}

								});

					}

				} else {

					userFunction(data);

				}

			}
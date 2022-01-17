function (response, ioArgs) {
					var wrappedResponse = new Response(response,
						request.type === 'rest',
						ioArgs);
					//do we think that this 'error' is a valid response, e.g. a 400 REST response?
					if (wrappedResponse.mappedStatusCodes.indexOf(ioArgs.xhr.status) > -1) {
						this.handleResponseFunc(request, wrappedResponse);
					} else {
						/* Unhandled error - something went wrong in the XHR request/response that we dont cope with.
						 * This can happen for a timeout or an unhandled status code.
						 * It's OK to send the error to the console as this does not pose a security risk.
						 * The failure is freely available using http traffic monitoring so we are not 'leaking' information
						 */
						console.error(response);
						this.handleErrorFunc(request, response);
						//you could do further processing such as put the transport in a retry or quiescent state
					}
				}
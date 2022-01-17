function(next) {				

					if (options instanceof Function) {

						options = options.call(executionContext, []);

					}

					contextProperty(options, function(err, res) {

						debug("Finished Executing '"+ propertyName + "'")

						var errorDetail = errorDetailForNextTask;

						errorDetailForNextTask = null;

						if (err) {

							if (errorDetail) {

								if (errorDetail instanceof Function) {

									err = errorDetail(err);

								} else {

									err = { message : errorDetail, error : err };

								}

							};

							next(err);

						} else {

							addResultToContext(propertyName, res);

							next();

						}

					});

				}
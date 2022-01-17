function createFluentWrapperFunction(propertyName, contextProperty) {

			return function(options) {

				if (taskGroups.length === 0) {

					series();

				}

				taskGroups[taskGroups.length-1].tasks.push(function(next) {

					if (options instanceof Function) {

						options = options.call(thisContext, []);

					}

					contextProperty(options, function(err, res) {

						if (err) { next(err); } else {

							thisContext.push(res);

							thisContext[propertyName] = res;

							next(null, {

								name : propertyName,

								result : res

							});

						}

					});

				});

				return fluidContext;

			};

		}
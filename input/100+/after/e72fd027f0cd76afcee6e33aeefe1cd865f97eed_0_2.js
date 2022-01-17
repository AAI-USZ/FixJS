function executeTaskGroups() {

			var options = arguments.length == 2 ? arguments[0] : {};

			var callback = arguments.length == 2 ? arguments[1] : arguments[0];

			isDebug = options && options.debug ? options.debug : false;

			debug("Executing "+ taskGroups.length + " task group(s)")

			

			hasMultipleTaskGroups = taskGroups.length > 1;

			executionContext = hasMultipleTaskGroups ? [] : null;

			

			async.forEachSeries(taskGroups, function(taskGroup, next) {

				debug("Executing "+ taskGroup.tasks.length +" async task(s) in : "+ taskGroup.modeType);

				

				if (hasMultipleTaskGroups) {

					executionContext.push([]);

				} else {

					executionContext = [];

				}

				

				taskGroup.mode(taskGroup.tasks, function(err) {

					if (err) { next(err); } else {

						next();

					}

				})

			},function(err) {

				var returnValue = executionContext;

				taskGroups = [];

				hasMultipleTaskGroups = null;

				executionContext = null;

				callback(err ? err : null, returnValue);

			});

		}
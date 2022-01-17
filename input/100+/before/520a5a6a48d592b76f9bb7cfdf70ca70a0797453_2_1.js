function () {
			// Detect the optional success and failure callback delegates
			var onSuccess;
			var onFail;
			var paths = null;

			if (arguments.length > 1) {
				onSuccess = arguments[arguments.length - 2];
				if (onSuccess instanceof Function) {
					onFail = arguments[arguments.length - 1];
				}
				else {
					onSuccess = arguments[arguments.length - 1];
				}
			}
			else if (arguments.length > 0)
				onSuccess = arguments[arguments.length - 1];

			if (!(onSuccess instanceof Function))
				onSuccess = undefined;

			var onSuccessFn = function (result) {
				if (onSuccess !== undefined) {
					onSuccess(result.event);
				}
			};

			var argCount = arguments.length - (onSuccess === undefined ? 0 : 1) - (onFail === undefined ? 0 : 1);
			var firstArgCouldBeParameterSet = argCount > 0 && arguments[0] instanceof Object && !(def.parameters.length === 0 || arguments[0][def.parameters[0]] === undefined);
			var instance = this instanceof Entity ? this : null;

			if (argCount >= 1 && argCount <= 2 && arguments[0] instanceof Object &&
					((argCount == 1 && (def.parameters.length != 1 || firstArgCouldBeParameterSet)) ||
					((argCount == 2 && (def.parameters.length != 2 || (firstArgCouldBeParameterSet && arguments[1] instanceof Array)))))) {

				// Invoke the server event
				context.server.raiseServerEvent(methodName, instance, arguments[0], false, onSuccessFn, onFail, argCount == 2 ? arguments[1] : null);
			}

			// Otherwise, assume that the parameters were all passed in sequential order
			else {
				// Throw an error if the incorrect number of arguments were passed to the method
				if (def.parameters.length == argCount - 1 && arguments[argCount - 1] instanceof Array)
					paths = arguments[argCount - 1];
				else if (def.parameters.length != argCount)
					ExoWeb.trace.throwAndLog("type", "Invalid number of arguments passed to \"{0}.{1}\" method.", [this._fullName, def.name]);

				// Construct the arguments to pass
				var args = {};
				for (var parameter in def.parameters) {
					if (def.parameters.hasOwnProperty(parameter)) {
						args[def.parameters[parameter]] = arguments[parameter];
					}
				}

				// Invoke the server event
				context.server.raiseServerEvent(methodName, instance, args, false, onSuccessFn, onFail, paths);
			}
		}
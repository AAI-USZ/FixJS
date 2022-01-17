function (target, options) {
	target.isValid = ko.observable(true);
	target.isModified = ko.observable(false);

	target.hasError = ko.computed(function () {
		return !target.isValid();
	});
	target.hasModError = ko.computed(function () {
		return target.isModified() && !target.isValid();
	});

	target.errorMessage = ko.observable("");

	target.invalidate = function (message) {
	    target.isValid(false);
	    target.errorMessage(message);
	}
	
	target.reset = function () {
		target("");
		target.isModified(false);
	}

	if (typeof options.func === "function" && typeof options.computed !== "undefined" && options.computed === true) {
		var computedFunc = ko.computed(function () {
			var value = target();
			return options.func(value);
		});
	}

	function validate(modify) {
		var value = target();
		var messages = [];

		if (typeof modify === "undefined" || modify)
			target.isModified(true);

		if (options.required && value == "") {
			target.invalidate(options.message);
		}
		else if (typeof options.regex !== "undefined" && !options.regex.test(value)) {
			target.invalidate(options.message);
		}
		else if (typeof options.func === "function") {
			handleFuncValidationResult(options.func(value));
		}
		else {
			target.isValid(true);
			target.errorMessage("");
		}
	}

	function handleFuncValidationResult(value){
		if (typeof value === "undefined")
			return;

		var message = options.message;
		if (value === false) {
			target.invalidate(options.message);
		}
		else if (value === true) {
			target.isValid(true);
			target.errorMessage("");
		}
		else {
			target.invalidate(value);
		}
	}

	validate(target());
	target.isModified(false);

	target.subscribe(validate);
	if (typeof computedFunc !== "undefined") {
		computedFunc.subscribe(handleFuncValidationResult);
	}

	return target;
}
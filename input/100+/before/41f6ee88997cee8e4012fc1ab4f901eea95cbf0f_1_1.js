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

	if (typeof options.func === "function") {
		var computedFunc = ko.computed(options.func);
	}

	function validate(v, modify) {
		var value = target();
		var messages = [];

		if (typeof modify === "undefined" || modify)
			target.isModified(true);

		var message = options.message;
		if (
            (options.required && value == "")
				||
		    (typeof options.regex !== "undefined" && !options.regex.test(value))
			    ||
            (typeof options.func === "function" && !(message = options.func(value)) && typeof message !== "undefined")
		   )
		{
			if (message === false)
				message = options.message;

		    target.invalidate(message);
		}
        else
		    target.isValid(true);
	}

	validate(target());
	target.isModified(false);

	target.subscribe(validate);

	if (typeof computedFunc === "function")
		computedFunc.subscribe(function (v) {
			validate(v, false);
		});

	return target;
}
function weave(/* arg, arg, arg, deferred*/) {
		var woven = [];
		var i = 0;
		var $elements = $(this);
		var arg = arguments;

		// If deferred not a true Deferred, make it so
		var deferred = arg[arg.length - 1][THEN] instanceof FUNCTION
			? POP.call(arg)
			: $.Deferred();

		$elements
			// Reduce to only elements that can be woven
			.filter(SELECTOR_WEAVE)
			// Iterate
			.each(function elementIterator(index, element) {
				var $element = $(element);
				var $data = $element.data();
				var weave = $element.attr(DATA_WEAVE) || "";
				var re = /[\s,]*([\w_\-\/]+)(?:\(([^\)]+)\))?/g;
				var widgets = [];
				var mark = i;
				var j = 0;
				var matches;

				$element
					// Store DATA_WEAVE attribute as WEAVE
					.data(WEAVE, weave)
					// Store widgets array as WOVEN
					.data(WOVEN, widgets)
					// Make sure to remove DATA_WEAVE (so we don't try processing this again)
					.removeAttr(DATA_WEAVE);

				// Iterate widgets (while the RE_WEAVE matches)
				while (matches = re.exec(weave)) {
					// Defer weave
					$.Deferred(function deferedRequire(dfdWeave) {
						var _j = j++; // store _j before we increment
						var k;
						var l;
						var kMax;
						var value;

						// Store on woven
						woven[i++] = dfdWeave;

						// Link deferred
						dfdWeave.then(function doneRequire(widget) {
							widgets[_j] = widget;
						}, deferred.reject, deferred.notify);

						// Get widget name
						var name = matches[1];

						// Set initial argv
						var argv = [ $element, name ];

						// Append values from arg to argv
						for (k = 0, kMax = arg.length, l = argv.length; k < kMax; k++, l++) {
							argv[l] = arg[k];
						}

						// Get widget args
						var args = matches[2];

						// Any widget arguments
						if (args !== UNDEFINED) {
							// Convert args to array
							args = args.split(RE_SEPARATOR);

							// Append typed values from args to argv
							for (k = 0, kMax = args.length, l = argv.length; k < kMax; k++, l++) {
								// Get value
								value = args[k];

								if (value in $data) {
									argv[l] = $data[value];
								} else if (RE_STRING.test(value)) {
									argv[l] = value.slice(1, -1);
								} else if (RE_DIGIT.test(value)) {
									argv[l] = Number(value);
								} else if (RE_BOOLEAN.test(value)) {
									argv[l] = RE_BOOLEAN_TRUE.test(value);
								} else {
									argv[l] = value;
								}
							}
						}

						require([ name ], function required(Widget) {
							// Defer require
							$.Deferred(function deferredStart(dfdRequire) {
								// Constructed and initialized instance
								var widget = Widget
									.apply(Widget, argv)
									.bind(DESTROY, onDestroy);

								// Link deferred
								dfdRequire.then(function doneStart() {
									dfdWeave.resolve(widget);
								}, dfdWeave.reject, dfdWeave.notify);

								// Start
								widget.start(dfdRequire);
							});
						});
					});
				}

				// Slice out widgets woven for this element
				$WHEN.apply($, woven.slice(mark, i)).done(function doneRequired() {
					// Set DATA_WOVEN attribute
					$element.attr(DATA_WOVEN, JOIN.call(arguments, " "));
				});
			});

		// When all deferred are resolved, resolve original deferred
		$WHEN.apply($, woven).then(deferred.resolve, deferred.reject, deferred.notify);

		return $elements;
	}
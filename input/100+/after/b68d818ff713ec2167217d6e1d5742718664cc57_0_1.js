function (element, valueAccessor, allBindingsAccessor, viewModel) {
		/// <summary>
		/// Method called right after binding ViewModel to element that has "kendoDatePicker" binding handler applied to it.
		/// </summary>
		/// <param name="element">The DOM element involved in this binding</param>
		/// <param name="valueAccessor">A JavaScript function that you can call to get the current model property that is involved in this binding. Call this without passing any parameters (i.e., call valueAccessor()) to get the current model property value.</param>
		/// <param name="allBindingsAccessor"> A JavaScript function that you can call to get all the model properties bound to this DOM element. Like valueAccessor, call it without any parameters to get the current bound model properties.</param>
		/// <param name="viewModel">The view model object that was passed to ko.applyBindings. Inside a nested binding context, this parameter will be set to the current data item (e.g., inside a with: person binding, viewModel will be set to person).</param>

		var configuration = $.extend({
			animation: false,
			css: {},
			depth: "month",
			enable: true,
			event: {},
			format: "MM/dd/yyyy",
			max: new Date(2099, 11, 31),
			min: new Date(1900, 0, 1),
			start: "month",
			value: null
		}, valueAccessor());

		var control = null;
		var valueToSet = configuration.value;
		
		if (valueToSet != null) {
			if (ko.isObservable(valueToSet)) {
				valueToSet.subscribe(function (value) {
					control.value(value);
				});
				valueToSet = valueToSet();
			}
		}
		
		var enable = configuration.enable;
		if (ko.isObservable(enable)) {
			enable.subscribe(function (newValue) {
				control.enable(newValue);
			});
			enable = configuration.enable();
		}

		control = $(element).kendoDatePicker({
			animation: configuration.animation,
			depth: configuration.depth,
			format: configuration.format,
			max: configuration.max,
			min: configuration.min,
			start: configuration.start,
			value: valueToSet
		}).data("kendoDatePicker");
		
		if (kendo.support.touch) {
			var selector = "td:has(.k-link)";
			var calendar = control.dateView.calendar;
			calendar.element
					.undelegate(selector, "touchstart touchend")
					.delegate(selector, "touchstart touchend", function (e) {
						$(this).toggleClass("k-state-hover", e.type == "touchstart");
					})
					.delegate(selector, "touchend", $.proxy(calendar._click, calendar));
		}

		
		control.enable(enable);

		if (configuration.value != null && ko.isObservable(configuration.value)) {
			control.bind("change", function (e) {
				if (!e) {
					configuration.value(null);
				}
				var value = this.value();
				var previousValue = configuration.value();
				configuration.value(new Date(value.getFullYear(), value.getMonth(), value.getDate(),
									previousValue ? previousValue.getHours() : 0, previousValue ? previousValue.getMinutes() : 0, previousValue ? previousValue.getSeconds() : 0));
			});
		}

		bindEventHandlers(control, configuration.event);
		applyStyles($(control.element).parent().parent(), configuration.css);
	}
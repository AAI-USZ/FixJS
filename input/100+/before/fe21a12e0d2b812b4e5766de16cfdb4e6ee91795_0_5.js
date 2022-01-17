function(ko, $, undefined) {function applyStyles(control, cssConfiguration) {
	/// <summary>
	/// Binds classes to control.
	/// </summary>
	/// <param name="control">Instance of jQuery pointer to control.</param>
	/// <param name="cssConfiguration">Css configuration.</param>
	
	for (var className in cssConfiguration) {
		var classValue = cssConfiguration[className];
		if (ko.isObservable(classValue)) {
			classValue() ? control.addClass(className) : control.removeClass(className);
			classValue.subscribe(function (value) {
				value ? control.addClass(className) : control.removeClass(className);
			});
		} else {
			classValue ? control.addClass(className) : control.removeClass(className);
		}
	}
}

function bindEventHandlers(control, events) {
	/// <summary>
	/// Binds all event handlers to specified control.
	/// </summary>
	/// <param name="control">Instance of control to which bind events.</param>
	/// <param name="events">Object containing map of events to bind.</param>
	
	for (var event in events) {
		control.bind(event, events[event])
	}
}
ko.bindingHandlers.kendoAutoComplete = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        /// <summary>
        /// Method called right after binding ViewModel to element that has "kendoAutoComplete" binding handler applied to it.
        /// Initializes instance of kendo AutoComplete and binds value to it.
        /// </summary>
        /// <param name="element">The DOM element involved in this binding</param>
        /// <param name="valueAccessor">A JavaScript function that you can call to get the current model property that is involved in this binding. Call this without passing any parameters (i.e., call valueAccessor()) to get the current model property value.</param>
        /// <param name="allBindingsAccessor"> A JavaScript function that you can call to get all the model properties bound to this DOM element. Like valueAccessor, call it without any parameters to get the current bound model properties.</param>
        /// <param name="viewModel">The view model object that was passed to ko.applyBindings. Inside a nested binding context, this parameter will be set to the current data item (e.g., inside a with: person binding, viewModel will be set to person).</param>

        var configuration = $.extend({
            css: {},
            dataSource: [],
            dataTextField: null,
            dataValueField: null,
            enable: true,
            event: {},
            filter: "startswith",
            height: 200,
            highlightFirst: true,
            ignoreCase: true,
            minLength: 1,
            placeholder: "",
            separator: "",
            suggest: false,
            value: null
        }, valueAccessor());

        var accessDataItemText = configuration.dataTextField ? function (dataItem) { return dataItem[configuration.dataTextField]; } : function (dataItem) { return dataItem; };
        var accessDataItemValue = configuration.dataValueField ? function (dataItem) { return dataItem[configuration.dataValueField]; } : function (dataItem) { return dataItem; };
        var control = null;
        var controlDataSource = null;
        var setValue = function (value) {
            var count = controlDataSource.total();
            for (var index = 0; index < count; index++) {
                if (accessDataItemValue(controlDataSource.at(index)) == value) {
                    control.value(accessDataItemText(controlDataSource.at(index)));
                    break;
                }
            }
        };
        var valueToSet = configuration.value;
		var $element = $(element);
        if (valueToSet != null) {
            if (ko.isObservable(valueToSet)) {
				valueToSet.subscribe(function (value) {
                    setValue(value);
                });
                valueToSet = valueToSet();
            }
        }
		
        if (ko.isObservable(configuration.dataSource)) {
            controlDataSource = new kendo.data.DataSource({ data: configuration.dataSource() });
			configuration.dataSource.subscribe(function (value) {
                controlDataSource.cancelChanges();
                for (var index = 0; index < value.length; index++) {
                    controlDataSource.add(value[index]);
                }
                setValue(valueToSet);
                control.popup.open();
            });
        } else if ($.isArray(configuration.dataSource)) {
            controlDataSource = new kendo.data.DataSource({ data: configuration.dataSource });
        } else {
            // Assuming that this data source is native kendo data source.
            controlDataSource = configuration.dataSource;
        }

        control = $element.kendoAutoComplete({
            dataSource: controlDataSource,
            dataTextField: configuration.dataTextField,
            enable: configuration.enable,
            filter: configuration.filter,
            height: configuration.height,
            highlightFirst: configuration.highlightFirst,
            ignoreCase: configuration.ignoreCase,
            minLength: configuration.minLength,
            placeholder: configuration.placeholder,
            separator: configuration.separator,
            suggest: configuration.suggest
        }).data("kendoAutoComplete");
		
		$element.on('removing', function() {
			(control.popup.wrapper[0] ? control.popup.wrapper : control.popup.element).remove();
			control.element.show().insertBefore(control.wrapper);
			control.wrapper.remove();
			control.element.removeData("kendoComboBox");
		});
		
        setValue(valueToSet);

        if (configuration.value != null && ko.isObservable(configuration.value)) {
            control.bind("select", function (e) {
                if (!e) {
                    configuration.value(null);
                }

                var currentItem = e.item[0];
                var itemsCollection = control.ul[0].children;
                var itemsCount = itemsCollection.length;
                for (var index = 0; index < itemsCount; index++) {
                    if (currentItem == itemsCollection[index]) {
                        configuration.value(control._data()[index]);
                        break;
                    }
                }
            });
        }

		bindEventHandlers(control, configuration.event);
		applyStyles($(control.element).parent(), configuration.css);
    }
};
ko.bindingHandlers.kendoComboBox = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        /// <summary>
        /// Method called right after binding ViewModel to element that has "kendoComboBox" binding handler applied to it.
        /// Initializes instance of kendo AutoComplete and binds value to it.
        /// </summary>
        /// <param name="element">The DOM element involved in this binding</param>
        /// <param name="valueAccessor">A JavaScript function that you can call to get the current model property that is involved in this binding. Call this without passing any parameters (i.e., call valueAccessor()) to get the current model property value.</param>
        /// <param name="allBindingsAccessor"> A JavaScript function that you can call to get all the model properties bound to this DOM element. Like valueAccessor, call it without any parameters to get the current bound model properties.</param>
        /// <param name="viewModel">The view model object that was passed to ko.applyBindings. Inside a nested binding context, this parameter will be set to the current data item (e.g., inside a with: person binding, viewModel will be set to person).</param>

        var configuration = $.extend({
            animation: false,
            css: {},
            dataSource: [],
            dataTextField: "",
            dataValueField: "",
            enable: true,
            event: {},
            filter: "startswith",
            height: 200,
            highLightFirst: true,
            ignoreCase: true,
			isBusy: ko.observable(false),
            minLength: 1,
            placeholder: "",
            separator: "",
            suggest: false,
            value: null
        }, valueAccessor());

        var accessDataItemText = configuration.dataTextField == null ? function (dataItem) { return dataItem; } : function (dataItem) { return dataItem[configuration.dataTextField]; };
        var accessDataItemValue = configuration.dataValueField == null ? function (dataItem) { return dataItem; } : function (dataItem) { return dataItem[configuration.dataValueField]; };
        var control = null;
        var controlDataSource = null;
        var valueToSet = configuration.value;
        var rebindValue = function (value) {
            value = value ? value : valueToSet
            var total = controlDataSource.total();
            for (var itemIndex = 0; itemIndex < total; itemIndex++) {
                if (accessDataItemValue(controlDataSource.at(itemIndex)) == value) {
                    control.value(value);
                    return;
                }
            }
            control.value(null);
        };

        if (valueToSet != null) {
            if (ko.isObservable(valueToSet)) {
                valueToSet.subscribe(function (value) {
                    valueToSet = value;
                    rebindValue();
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

		var unwrapDataSource = function (dataSource) {
			var dataArray = [];
			if (configuration.dataTextField || configuration.dataValueField) {
				for (var index = 0; index < dataSource.length; index++) {
					var dataItem = $.extend({}, dataSource[index]);
					if (configuration.dataTextField && ko.isObservable(dataItem[configuration.dataTextField]))
						dataItem[configuration.dataTextField] = dataItem[configuration.dataTextField]();
					if (configuration.dataValueField && ko.isObservable(dataItem[configuration.dataValueField]))
						dataItem[configuration.dataValueField] = dataItem[configuration.dataValueField]();
					dataArray.push(dataItem);
				}
			}
            else {
				dataArray = dataSource;
			}
			return dataArray;
		};
		
        if (ko.isObservable(configuration.dataSource)) {
            controlDataSource = new kendo.data.DataSource({ data: unwrapDataSource(configuration.dataSource()) });
            configuration.dataSource.subscribe(function (value) {
                controlDataSource.cancelChanges();
                var dataArray = unwrapDataSource(value);
				for (var index = 0; index < dataArray.length; index++) {
					controlDataSource.add(dataArray[index]);
				}
                rebindValue();
            });
        } else if ($.isArray(configuration.dataSource)) {
			controlDataSource = new kendo.data.DataSource({ data: unwrapDataSource(configuration.dataSource) });
        } else {
            // Assuming that this data source is native kendo data source.
            controlDataSource = configuration.dataSource;
        }

        control = $(element).kendoComboBox({
            animation: configuration.animation,
            dataSource: controlDataSource,
            dataTextField: configuration.dataTextField,
            enable: enable,
            filter: configuration.filter,
            height: configuration.height,
            highlightFirst: configuration.highlightFirst,
            ignoreCase: configuration.ignoreCase,
            minLength: configuration.minLength,
            placeholder: configuration.placeholder,
            separator: configuration.separator,
            suggest: configuration.suggest
        }).data("kendoComboBox");

		if (!ko.isObservable(configuration.isBusy))
			throw "ComboBox'es IsBusy must be observable!";
		
		configuration.isBusy.subscribe(function (value) {
			if (value) {
				control.enable(false);
				control._busy = null;
				control._showBusy();
			}
			else {
				control._hideBusy();
				control.enable(true);
			}
		});
		
        rebindValue();

        if (configuration.value != null && ko.isObservable(configuration.value)) {
            control.bind("select", function (e) {
                if (!e) {
                    configuration.value(null);
                }

                configuration.value(e.item.index() == -1 ? null : accessDataItemValue(this.dataItem(e.item.index())));
            });
            control.bind("change", function (e) {
                if (!e) {
                    configuration.value(null);
                }

                configuration.value(this.selectedIndex == -1 ? null : accessDataItemValue(this.dataItem(this.selectedIndex)));
            });
        }

        bindEventHandlers(control, configuration.event);
		applyStyles($(control.element).parent(), configuration.css);
    }
};
ko.bindingHandlers.kendoDropDownList = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        /// <summary>
        /// Method called right after binding ViewModel to element that has "kendoDropDownList" binding handler applied to it.
        /// </summary>
        /// <param name="element">The DOM element involved in this binding</param>
        /// <param name="valueAccessor">A JavaScript function that you can call to get the current model property that is involved in this binding. Call this without passing any parameters (i.e., call valueAccessor()) to get the current model property value.</param>
        /// <param name="allBindingsAccessor"> A JavaScript function that you can call to get all the model properties bound to this DOM element. Like valueAccessor, call it without any parameters to get the current bound model properties.</param>
        /// <param name="viewModel">The view model object that was passed to ko.applyBindings. Inside a nested binding context, this parameter will be set to the current data item (e.g., inside a with: person binding, viewModel will be set to person).</param>

        var configuration = $.extend({
            animation: false,
            css: {},
            dataSource: [],
            dataTextField: null,
            dataValueField: null,
            delay: 500,
            enable: true,
            event: {},
            height: 200,
            ignoreCase: true,
            index: 0,
            optionLabel: "",
            value: null
        }, valueAccessor());

        var accessDataItemText = configuration.dataTextField == null ? function (dataItem) { return dataItem; } : function (dataItem) { return dataItem[configuration.dataTextField]; };
        var accessDataItemValue = configuration.dataValueField == null ? function (dataItem) { return dataItem; } : function (dataItem) { return dataItem[configuration.dataValueField]; };
        var control = null;
        var controlDataSource = null;
        var valueToSet = configuration.value;
        var rebindValue = function (value) {
            value = value ? value : valueToSet
            var total = controlDataSource.total();
            for (var itemIndex = 0; itemIndex < total; itemIndex++) {
                if (accessDataItemValue(controlDataSource.at(itemIndex)) == value) {
                    control.value(value);
                    return;
                }
            }
            control.value(null);
        };

        if (valueToSet != null) {
            if (ko.isObservable(valueToSet)) {
                valueToSet.subscribe(function (value) {
                    valueToSet = value
                    rebindValue();
                });
                valueToSet = valueToSet();
            }
        }
        var enable = configuration.enable;
        if (ko.isObservable(enable)) {
            enable.subscribe(function (newValue) {
                control.enable(newValue);
            });
            enable = enable();
        }

        if (ko.isObservable(configuration.dataSource)) {
            controlDataSource = new kendo.data.DataSource({ data: configuration.dataSource() });
            configuration.dataSource.subscribe(function (value) {
                controlDataSource.cancelChanges();
                for (var index = 0; index < value.length; index++) {
                    controlDataSource.add(value[index]);
                }
                rebindValue();
            });
        } else if ($.isArray(configuration.dataSource)) {
            controlDataSource = new kendo.data.DataSource({ data: configuration.dataSource });
        } else {
            // Assuming that this data source is native kendo data source.
            controlDataSource = configuration.dataSource;
        }

        control = $(element).kendoDropDownList({
            animation: configuration.animation,
            dataSource: controlDataSource,
            dataTextField: configuration.dataTextField,
            dataValueField: configuration.dataValueField,
            delay: configuration.delay,
            enable: enable,
            height: configuration.height,
            ignoreCase: configuration.ignoreCase,
            index: configuration.index,
            optionLabel: configuration.optionLabel
        }).data("kendoDropDownList");

        rebindValue();

        if (configuration.value != null && ko.isObservable(configuration.value)) {
            control.bind("select", function (e) {
                if (!e) {
                    configuration.value(null);
                }

                configuration.value(accessDataItemValue(this.dataItem(e.item.index())));
            });
            control.bind("change", function (e) {
                if (!e) {
                    configuration.value(null);
                }

                configuration.value(accessDataItemValue(this.dataItem(this.selectedIndex)));
            });
        }

        bindEventHandlers(control, configuration.event);
        applyStyles($(control.element).parent().parent(), configuration.css);
    }
};
ko.bindingHandlers.kendoDatePicker = {
	init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
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
};
ko.bindingHandlers.kendoTimePicker = {
	init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		/// <summary>
		/// Method called right after binding ViewModel to element that has "kendoTimePicker" binding handler applied to it.
		/// </summary>
		/// <param name="element">The DOM element involved in this binding</param>
		/// <param name="valueAccessor">A JavaScript function that you can call to get the current model property that is involved in this binding. Call this without passing any parameters (i.e., call valueAccessor()) to get the current model property value.</param>
		/// <param name="allBindingsAccessor"> A JavaScript function that you can call to get all the model properties bound to this DOM element. Like valueAccessor, call it without any parameters to get the current bound model properties.</param>
		/// <param name="viewModel">The view model object that was passed to ko.applyBindings. Inside a nested binding context, this parameter will be set to the current data item (e.g., inside a with: person binding, viewModel will be set to person).</param>

		var configuration = $.extend({
			css: {},
			enable: true,
			event: {},
			format: "h:mm tt",
            interval: 30,
			max: new Date(0, 0),
			min: new Date(0, 0),
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

		control = $(element).kendoTimePicker({
		    format: configuration.format,
            interval: configuration.interval,
			max: configuration.max,
			min: configuration.min,
			value: valueToSet
		}).data("kendoTimePicker");

		if (configuration.value != null && ko.isObservable(configuration.value)) {
			control.bind("change", function (e) {
				if (!e) {
					configuration.value(null);
				}

				configuration.value(this.value());
			});
		}

		bindEventHandlers(control, configuration.event);
		applyStyles($(control.element).parent().parent(), configuration.css);
	}
};}
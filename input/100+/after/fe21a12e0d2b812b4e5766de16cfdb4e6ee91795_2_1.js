function (element, valueAccessor, allBindingsAccessor, viewModel) {
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

		var enable = configuration.enable;
		if (ko.isObservable(enable)) {
			enable.subscribe(function (newValue) {
				control.enable(newValue);
			});
			enable = configuration.enable();
		}

        control = $element.kendoAutoComplete({
            dataSource: controlDataSource,
            dataTextField: configuration.dataTextField,
            filter: configuration.filter,
            height: configuration.height,
            highlightFirst: configuration.highlightFirst,
            ignoreCase: configuration.ignoreCase,
            minLength: configuration.minLength,
            placeholder: configuration.placeholder,
            separator: configuration.separator,
            suggest: configuration.suggest
        }).data("kendoAutoComplete");
		
		control.enable(enable);
		
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
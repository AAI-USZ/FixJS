function (value) {
            value = value ? value : valueToSet
            var total = controlDataSource.total();
            for (var itemIndex = 0; itemIndex < total; itemIndex++) {
                if (accessDataItemValue(controlDataSource.at(itemIndex)) == value) {
                    control.value(controlDataSource.at(itemIndex));
                    return;
                }
            }
            control.value(null);
        }
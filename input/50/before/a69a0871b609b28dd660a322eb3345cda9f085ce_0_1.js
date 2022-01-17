function (e) {
                if (!e) {
                    configuration.value(null);
                }

                configuration.value(accessDataItemValue(this.dataItem(this.selectedIndex)));
            }
function (e) {
                if (!e) {
                    configuration.value(null);
                }

                configuration.value(this.selectedIndex == -1 ? null : accessDataItemValue(this.dataItem(this.selectedIndex)));
            }
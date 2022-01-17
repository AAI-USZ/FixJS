function (e) {
                if (!e) {
                    configuration.value(null);
                }

                configuration.value(e.item.index() == -1 ? null : accessDataItemValue(this.dataItem(e.item.index())));
            }
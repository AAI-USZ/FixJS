function () {
        var obj = ko.toJS(this);

        var data = {
            id: obj.id,
            menu_item: obj.menuItem,
            amount: obj.amount
        };
        if (obj.isRemoved) {
            data._destroy = true;
        }

        return data;
    }
function () {
        var obj = ko.toJS(this);

        return {
            id: obj.id,
            menu_item: obj.menuItem,
            amount: obj.amount
        };
    }
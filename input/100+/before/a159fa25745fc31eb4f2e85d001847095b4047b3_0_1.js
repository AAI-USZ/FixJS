function (data) {
    var self = this;
    data = data || {};

    self.id = ko.observable(data.id || null);

    var menuItem = data.menuItem || LT.MenuItemRepository.create(data.menu_item);
    //menuItem is required
    self.menuItem = ko.observable(menuItem);

    self.amount = ko.observable(data.amount || null);

    self.title = ko.computed(function () {
        return self.menuItem().title();
    });
    self.price = ko.computed(function () {
        return self.menuItem().price() * self.amount();
    });
    self.addOne = function () {
        return self.amount(self.amount() + 1);
    };
    self.removeOne = function () {
        return self.amount(self.amount() - 1);
    };

    self.isNew = ko.computed(function () {
        return self.id() === null;
    });

    self.isActive = ko.computed(function () {
        return self.amount() > 0;
    });

    self.toJSON = function () {
        var obj = ko.toJS(this);

        return {
            id: obj.id,
            menu_item: obj.menuItem,
            amount: obj.amount
        };
    };

}
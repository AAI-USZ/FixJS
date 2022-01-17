function (data) {
    var self = this;
    data = data || {};
    self.id = ko.observable(data.id || null);
    var clientId = data.client_id || LT.OrderRepository.generateClientId();
    self.clientId = ko.observable(clientId);
    //date is required
    self.date = ko.observable(Date.parse(data.date));
    self.items = ko.observableArray([]);
    data.items = data.items || [];
    for (var i = 0; i < data.items.length; i++) {
        self.items.push(new LT.OrderItem(data.items[i]));
    }

    self.activeItems = ko.computed(function () {
        return ko.utils.arrayFilter(self.items(), function (item) {
            return item.isActive();
        });

    });

    self.totalPrice = ko.computed(function () {
        var total = 0;

        ko.utils.arrayForEach(self.items(), function (item) {
            total += item.price();
        });

        return total;
    });

    self.addItem = function (menuItem) {

        var item = ko.utils.arrayFirst(self.items(), function (item) {
            return menuItem == item.menuItem();
        });

        if (item) {
            item.addOne();
        } else {
            item = new LT.OrderItem({menuItem: menuItem, amount: 1});
            self.items.push(item);
        }
    };

    self.removeItem = function (item) {
        if (item.amount() > 1) {
            item.removeOne();
        } else {
            item.isNew() ? self.items.remove(item) : item.amount(0);

        }
    };

    self.toJSON = function () {
        var obj = ko.toJS(this);

        return {
            id: obj.id,
            client_id: obj.clientId,
            date: obj.date.toString('yyyy-MM-dd HH:mm:ss'),
            items: obj.items
        };
    };

}
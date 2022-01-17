function (args) {
        var target = args[0], selector = args[1];
        this._super(target, selector);
        if (args.length == 2) {
            return false;
        }
        this._subItems = [];
        for (var i = 2; i < args.length; i++) {
            if (args[i]) {
                this._subItems.push(args[i]);
            }
        }
        this._selectedIndex = 0xffffffff;
        this.setSelectedIndex(0);
        return true;
    }
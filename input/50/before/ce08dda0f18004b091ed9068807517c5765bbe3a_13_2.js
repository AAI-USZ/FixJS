function (element) {
        cc.ArrayRemoveObject(this._targets, element);
        if (element) {
            element.actions = null;
            element.target = null;
        }
    }
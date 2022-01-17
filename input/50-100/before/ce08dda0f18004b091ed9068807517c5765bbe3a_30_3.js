function (label, target, selector) {
    var ret = new cc.MenuItemLabel();
    if (arguments.length == 3) {
        ret.initWithLabel(label, target, selector);
    } else {
        ret.initWithLabel(label);
    }
    return ret;
}
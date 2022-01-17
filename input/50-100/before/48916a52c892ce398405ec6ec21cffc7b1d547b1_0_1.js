function (d1, d2) {
    var o1 = utils.isNumber(d1) ? this.getChildAtOrder(d1) : this.children[d1],
        o2 = utils.isNumber(d2) ? this.getChildAtOrder(d2) : this.children[d2],
        d = o1.order;
    o1.order = o2.order;
    o2.order = d;
    setDirty(this, 'childrenOrder');
    return this;
}
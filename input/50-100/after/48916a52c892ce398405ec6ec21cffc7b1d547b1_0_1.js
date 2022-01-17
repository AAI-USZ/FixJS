function (d1, d2) {
    var o1 = this.resolveChild(d1),
        o2 = this.resolveChild(d2),
        d = o1.order;
    o1.order = o2.order;
    o2.order = d;
    setDirty(this, 'childrenOrder');
    return this;
}
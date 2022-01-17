function (toMove, ref) {
    if (toMove === ref) {
        return;
    }
    var refOrder = 0,
        children = this.children,
        cToMove = children[toMove],
        rc;
    if (cToMove) {
        if (ref && children) {
            rc = children[ref];
            if (rc) {
                refOrder = rc.order;
            }
        }
        forEachProperty(this.children, function (c) {
            if (c.order >= refOrder) {
                c.order += 1;
            }
        });
        cToMove.order = refOrder;
        setDirty(this, 'childrenOrder');
    }
    return this;
}
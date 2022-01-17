function (toMove, ref) {
    if (toMove === ref) {
        return;
    }
    var refOrder = 0,
        children = this.children,
        cToMove = this.resolveChild(toMove),
        rc;
    if (cToMove) {
        if (ref && children) {
            rc = this.resolveChild(ref);
            if (rc) {
                refOrder = rc.order;
            }
        }
        forEachProperty(children, function (c) {
            if (c.order >= refOrder) {
                c.order += 1;
            }
        });
        cToMove.order = refOrder;
        setDirty(this, 'childrenOrder');
    }
    return this;
}
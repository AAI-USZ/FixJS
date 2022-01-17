function (child) {
    // allow the use of a name
    if (isString(child)) {
        child = this.children[child];
        if (!child) {
            throw new Error('Unavailable child');
        }
    } else if (isNumber(child)) {
        child = this.getChildAtOrder(child);
    } else if (isObject(child)) {
        if (child.parent !== this) {
            throw new Error('Invalid child');
        }
    } else {
        throw new Error("Unexpected child type " + (typeof child));
    }
    return child;
}
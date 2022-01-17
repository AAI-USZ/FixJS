function (child) {
    // allow the use of a name
    if (isString(child)) {
        child = this.children[child];
        if (!child) {
            throw new Error('Unavailable child');
        }
    } else {
        if (child.parent !== this) {
            throw new Error('Invalid child');
        }
    }
    return child;
}
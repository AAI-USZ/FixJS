function(elm, t) {
    var matched = [];
    if (this.intersects(elm, t)) {
        matched.push(this);
    }
    if (this.children) {
        elm.visitChildren(function(celm) {
            matched.concat(celm.dintersects(elm, t));
        });
    }
    return matched;
}
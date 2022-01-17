function (x, y) {
    var item = this.itemAt(x, y);
    if (item) {
        delete this.items[x + ',' + y];
        item.remove();
        this.itemSet.toFront();
    }
}
function (x, y) {
    var item = this.itemAt(x, y);
    if (item) {
        delete this.items[x + ',' + y];
        item.remove();
        for (var i = 0; i < this.itemSet.length; i++) {
            if (item === this.itemSet[i]) {
                this.itemSet.splice(i, 1);
                break;
            }
        }
        this.itemSet.toFront();
    }
}
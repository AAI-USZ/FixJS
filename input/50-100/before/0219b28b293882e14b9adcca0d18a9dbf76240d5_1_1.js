function (notify) {
    var positions = this.documentData.positions,
        selection = {};
    forEachProperty(this.selection, function (p, n) {
        if (positions[n]) {
            selection[n] = p;
        }
    });
    this.selection = selection;
    if (notify) {
        this.emit('selectionChanged');
    }
}
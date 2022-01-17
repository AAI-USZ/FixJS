function (notify) {
    var positions = this.documentData.positions,
        selection = {},
        posn;
    forEachProperty(this.selection, function (p, n) {
        posn = positions[n];
        if (posn &&
            posn.enableSelect !== false &&
            posn.enableDisplay !== false
        ) {
            selection[n] = p;
        }
    });
    this.selection = selection;
    if (notify) {
        this.emit('selectionChanged');
    }
}
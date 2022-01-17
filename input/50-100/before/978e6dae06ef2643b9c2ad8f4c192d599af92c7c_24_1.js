function testDialogReadOnly(field) {
    var before = blackberry.ui.dialog[field];
    blackberry.ui.dialog[field] = -1;
    expect(blackberry.ui.dialog[field]).toEqual(before);
}
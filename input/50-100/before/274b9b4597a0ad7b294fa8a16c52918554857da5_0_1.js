function createBoard() {
    var i;
    var newRow;
    var shapeCollection = shapeCollectionMock;
    for (i = 0; i < BOARD_SIZE; ++i) {
        newRow = document.createElement("div");
        onButtonPressFactory = makeOnButtonPress(i, shapeCollection);
        createRow(newRow, onButtonPressFactory);
        document.body.appendChild(newRow);
    }
}
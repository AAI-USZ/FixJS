function terminalTest() {

    var boardState = (arguments && isBoard(arguments[0]) ? arguments[0] : board)
    return getFreePositions(boardState) == 0
  }
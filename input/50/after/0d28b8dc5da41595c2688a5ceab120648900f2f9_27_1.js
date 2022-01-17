function _getKeyCoordinateY(y) {
    var candidatePanel = document.getElementById('keyboard-candidate-panel');

    var yBias = 0;
    if (candidatePanel)
      yBias = candidatePanel.clientHeight;

    return y - yBias;
  }
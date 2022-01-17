function (datadefName, pointNumber) {
    var pointSelected = Smartgraphs.graphingTool.get('pointSelectedinArray');
    var toolDatadefName = Smartgraphs.graphingTool.get('datadefName');
    if (pointSelected == (pointNumber - 1) && toolDatadefName == datadefName) {
      return true;
    }
    return false;
  }
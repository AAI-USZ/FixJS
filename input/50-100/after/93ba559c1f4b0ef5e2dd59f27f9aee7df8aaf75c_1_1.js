function (datadefName, pointNumber) {
    var graphingTool = Smartgraphs.graphingTool;
    if (graphingTool.get('pointMoved'))
    {
      var pointMovedNumber = graphingTool.get('pointMovedNumber');
      var toolDatadefName = graphingTool.get('datadefName');
      if (pointMovedNumber === (pointNumber - 1) && toolDatadefName === datadefName) {
        return true;
      }
    }
    return false;
  }
function(event) {
    var height, width, _ref;
    _ref = getDimensions(), width = _ref.width, height = _ref.height;
    return $('#output-text').text(DFHMExport["export"](width, height, determineSize(), worldState));
  }
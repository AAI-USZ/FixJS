function(event) {
    var exported, height, width, _ref;
    _ref = getDimensions(), width = _ref.width, height = _ref.height;
    exported = DFHMExport["export"](width, height, determineSize(), worldState);
    return $('#output-text').val(exported);
  }
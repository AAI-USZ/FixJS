function findError(script, lineNumber) {
  var start = 0;
  var end = 1;

  for (var i = 0; i < script.offsets.length; i++) {
    end = script.offsets[i];
    if (lineNumber <= end) {
      return {
        uri: script.requires[i].fileURL,
        lineNumber: (lineNumber - start)
      };
    }
    start = end;
  }

  return {
    uri: script.fileURL,
    lineNumber: (lineNumber - end)
  };
}
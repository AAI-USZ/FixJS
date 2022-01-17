function (text, startPos, endPos) {
    text = text.substring(startPos, endPos);
    var lines = text.split("\n");
    var reProcessedPortion = new RegExp("(^\\s*?<|^[^<]*?)(.+)(>\\s*?$|[^>]*?$)");
    var reOpenBrackets = new RegExp("<", "g");
    var reCloseBrackets = new RegExp("(>)([^\r\n])", "g");
    for (var i = 0; i < lines.length; i++) {
      var mToProcess = lines[i].match(reProcessedPortion);
      if (mToProcess != null && mToProcess.length > 3) { // The line starts with whitespaces and ends with whitespaces
        lines[i] = mToProcess[1]
            + mToProcess[2].replace(reOpenBrackets, "\n$&").replace(reCloseBrackets, "$1\n$2")
            + mToProcess[3];
        continue;
      }
    }

    return lines.join("\n");
  }
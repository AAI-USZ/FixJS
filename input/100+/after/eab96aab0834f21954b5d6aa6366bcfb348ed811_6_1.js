function(str) {
    var strSplit = str.split('\n');
    for (var i = 0; i < strSplit.length; ++i) {
      s = strSplit[i];
      realOut.push(s);
      if (outputPos < expectedOut.length) {
        if (expectedOut[outputPos] != s) {
          diffs.push('line ' + outputPos + ': expected <' +
                     expectedOut[outputPos] + '> found <' + s + '>\n');
        }
        outputPos++;
      } else {
        unexpectedOut = true;
      }
    }
  }
function write(str) {
    if (!str || !str.length) return;
    if (str.slice(0,3) === '/*!' && ! ruleBuffer.length) {
      output(str);
      return;
    }
    ruleBuffer.push(str);
    if (str === '}') {
      // check for empty rule
      if (ruleBuffer.length && ruleBuffer[ruleBuffer.length-2] !== '{') {
        output(ruleBuffer.join(''));
      }
      ruleBuffer = [];
    }
  }
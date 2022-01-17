function fixPhantom15EvaluateMethodToAddParameterPassing(webPage) {
    if (phantom.version.major <= 1 && phantom.version.minor <= 5) {
      //var oldEvaluate = webPage.evaluate;
      webPage.executeCommand = function (func, args) {
        // Thanks god the code is open source. Adapted from: https://github.com/ariya/phantomjs/commit/81794f9096
        var str, arg, i, l;
        if (!(func instanceof Function || typeof func === 'string' || func instanceof String)) {
          throw "Wrong use of WebPage#evaluate";
        }
        str = 'function() { return (' + func.toString() + ')(';
        for (i = 1, l = arguments.length; i < l; i++) {
          arg = arguments[i];
          if (/object|string/.test(typeof arg) && !(arg instanceof RegExp)) {
            str += 'JSON.parse(' + JSON.stringify(JSON.stringify(arg)) + '),';
          } else {
            str += arg + ',';
          }
        }
        str = str.replace(/,$/, '') + '); }';
        return webPage.evaluate(str);
      };
    } else
      webPage.executeCommand = webPage.evaluate;
    return webPage;
  }
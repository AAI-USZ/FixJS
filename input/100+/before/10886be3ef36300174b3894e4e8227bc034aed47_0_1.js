function template(text, data, options) {
    // based on John Resig's `tmpl` implementation
    // http://ejohn.org/blog/javascript-micro-templating/
    // and Laura Doktorova's doT.js
    // https://github.com/olado/doT
    options || (options = {});

    var endIndex,
        isEvaluating,
        startIndex,
        result,
        useWith,
        escapeDelimiter = options.escape,
        evaluateDelimiter = options.evaluate,
        interpolateDelimiter = options.interpolate,
        settings = lodash.templateSettings,
        variable = options.variable;

    // use default settings if no options object is provided
    if (escapeDelimiter == null) {
      escapeDelimiter = settings.escape;
    }
    if (evaluateDelimiter == null) {
      evaluateDelimiter = settings.evaluate;
    }
    if (interpolateDelimiter == null) {
      interpolateDelimiter = settings.interpolate;
    }

    // tokenize delimiters to avoid escaping them
    if (escapeDelimiter) {
      text = text.replace(escapeDelimiter, tokenizeEscape);
    }
    if (interpolateDelimiter) {
      text = text.replace(interpolateDelimiter, tokenizeInterpolate);
    }
    if (evaluateDelimiter != lastEvaluateDelimiter) {
      lastEvaluateDelimiter = evaluateDelimiter;
      reEvaluateDelimiter = RegExp(
        (evaluateDelimiter ? evaluateDelimiter.source : '($^)') +
        '|<e%-([\\s\\S]+?)%>|<e%=([\\s\\S]+?)%>'
      , 'g');
    }
    startIndex = tokenized.length;
    text = text.replace(reEvaluateDelimiter, tokenizeEvaluate);
    endIndex = tokenized.length - 1;
    isEvaluating = startIndex <= endIndex;

    // if `options.variable` is not specified and the template contains "evaluate"
    // delimiters, inject a with-statement around all "evaluate" delimiters to
    // add the data object to the top of the scope chain
    if (!variable) {
      variable = settings.variable || lastVariable || 'obj';
      useWith = isEvaluating;

      if (useWith) {
        tokenized[startIndex] = "';\n__with (" + variable + ') {\n' + tokenized[startIndex]
          .replace(reDelimiterCodeLeading, '')
          .replace(reDelimiterCodeMiddle, '__p += ');

        tokenized[endIndex] = tokenized[endIndex]
          .replace(reDelimiterCodeTrailing, '') + "\n}__\n__p += '";
      }
    }

    var strInsertVariable = '$&' + variable + '.',
        strDoubleVariable = '$1__d';

    // escape characters that cannot be included in string literals and
    // detokenize delimiter code snippets
    text = "__p = '" + text
      .replace(reUnescapedString, escapeStringChar)
      .replace(reToken, detokenize) + "';\n";

    // clear stored code snippets
    tokenized.length = 0;

    // find the start and end indexes of the with-statement
    if (useWith) {
      startIndex = text.indexOf('__with');
      endIndex = text.indexOf('}__', startIndex + 10);
    }
    // memoize `reDoubleVariable`
    if (variable != lastVariable) {
      lastVariable = variable;
      reDoubleVariable = RegExp('([(\\s])' + variable + '\\.' + variable + '\\b', 'g');
    }
    // prepend data object references to property names outside of the with-statement
    text = (useWith ? text.slice(0, startIndex) : text)
      .replace(reInsertVariable, strInsertVariable)
      .replace(reDoubleVariable, strDoubleVariable) +
      (useWith
        ? text.slice(startIndex + 2, endIndex + 1) +
          text.slice(endIndex + 3)
            .replace(reInsertVariable, strInsertVariable)
            .replace(reDoubleVariable, strDoubleVariable)
        : ''
      );

    // cleanup code by stripping empty strings
    text = (isEvaluating ? text.replace(reEmptyStringLeading, '') : text)
      .replace(reEmptyStringMiddle, '$1')
      .replace(reEmptyStringTrailing, '$1;');

    // frame code as the function body
    text = 'function(' + variable + ') {\n' +
      variable + ' || (' + variable + ' = {});\n' +
      'var __p, __t, __wt' +
      ', __d = ' + variable + '.' + variable + ' || ' + variable +
      ', __e = _.escape, __we = __e' +
      (isEvaluating
        ? ', __j = Array.prototype.join;\n' +
          'function print() { __p += __j.call(arguments, \'\') }\n'
        : ';\n'
      ) +
      text +
      'return __p\n}';

    // add a sourceURL for easier debugging
    // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
    if (useSourceURL) {
      text += '\n//@ sourceURL=/lodash/template/source[' + (templateCounter++) + ']';
    }

    result = Function('_', 'return ' + text)(lodash);

    if (data) {
      return result(data);
    }    // provide the compiled function's source via its `toString` method, in
    // supported environments, or the `source` property as a convenience for
    // build time precompilation
    result.source = text;
    return result;
  }

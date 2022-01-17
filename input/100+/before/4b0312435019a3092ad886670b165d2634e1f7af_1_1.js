function() {
  var DoccoPreProcessor, fs, highlight, parse, resolve, _ref;

  fs = require('fs');

  resolve = require('path').resolve;

  try {
    _ref = require('docco'), parse = _ref.parse, highlight = _ref.highlight;
  } catch (e) {
    return puts(error("" + 'Can\'t find the docco module.'.red + "\n\nRun cake install to install the dependencies"));
  }

  DoccoPreProcessor = (function() {
    var END_TAG, START_TAG;

    START_TAG = '<pre><code>';

    END_TAG = '</code></pre>';

    DoccoPreProcessor.asCommand = function(p, c) {
      return function(cb) {
        return new DoccoPreProcessor(p, c).process(cb);
      };
    };

    function DoccoPreProcessor(path, section) {
      this.path = path;
      this.section = section;
    }

    DoccoPreProcessor.prototype.process = function(callback) {
      this.cursor = 0;
      if (!this.hasTags()) {
        return typeof callback === "function" ? callback() : void 0;
      }
      return this.processTag(callback);
    };

    DoccoPreProcessor.prototype.hasTags = function() {
      return this.section.docs_html.indexOf(START_TAG, this.cursor) !== -1;
    };

    DoccoPreProcessor.prototype.processTag = function(callback) {
      var code, endTagPos, pre, startTagPos,
        _this = this;
      startTagPos = this.section.docs_html.indexOf(START_TAG, this.cursor);
      endTagPos = this.section.docs_html.indexOf(END_TAG, this.cursor);
      code = this.section.docs_html.substring(startTagPos + START_TAG.length, endTagPos);
      pre = {
        docs_text: '',
        code_text: code.strip().replace(/&gt;/g, '>').replace(/&lt;/g, '<')
      };
      return highlight(this.path, [pre], function() {
        var match;
        match = START_TAG + code + END_TAG;
        pre.code_html = pre.code_html.replace('\n</pre>', '</pre>');
        _this.section.docs_html = _this.section.docs_html.replace(match, pre.code_html);
        _this.cursor = startTagPos + pre.code_html.length;
        if (_this.hasTags()) {
          return _this.processTag(callback);
        } else {
          return typeof callback === "function" ? callback() : void 0;
        }
      });
    };

    return DoccoPreProcessor;

  })();

  module.exports = DoccoPreProcessor;

}
function() {
  var DoccoFileProcessor, DoccoPreProcessor, DoccoTitleProcessor, Parallel, error, fs, highlight, parse, puts, render, resolve, _ref, _ref1;

  fs = require('fs');

  resolve = require('path').resolve;

  _ref = require('../../utils/logs'), puts = _ref.puts, error = _ref.error;

  render = require('../../utils/templates').render;

  DoccoPreProcessor = require('./docco_pre_processor');

  DoccoTitleProcessor = require('./docco_title_processor');

  Parallel = require('../../async/parallel');

  try {
    _ref1 = require('docco'), parse = _ref1.parse, highlight = _ref1.highlight;
  } catch (e) {
    return error("" + 'Can\'t find the docco module.'.red + "\n\nRun cake install to install the dependencies");
  }

  DoccoFileProcessor = (function() {
    var TPL_PATH, TPL_TOC;

    TPL_PATH = resolve(__dirname.replace('.cmd', ''), '_page');

    TPL_TOC = resolve(__dirname.replace('.cmd', ''), '_toc');

    DoccoFileProcessor.asCommand = function(f, h, n) {
      return function(cb) {
        return new DoccoFileProcessor(f, h, n).process(cb);
      };
    };

    function DoccoFileProcessor(file, header, nav) {
      this.file = file;
      this.header = header;
      this.nav = nav;
    }

    DoccoFileProcessor.prototype.highlightFile = function(path, sections, callback) {
      var _this = this;
      return highlight(path, sections, function() {
        var presCmd, section, titles, titlesCmd, _i, _len;
        titles = [];
        presCmd = [];
        titlesCmd = [];
        for (_i = 0, _len = sections.length; _i < _len; _i++) {
          section = sections[_i];
          presCmd.push(DoccoPreProcessor.asCommand(path, section));
          titlesCmd.push(DoccoTitleProcessor.asCommand(path, section, titles));
        }
        return new Parallel(presCmd).run(function() {
          return new Parallel(titlesCmd).run(function() {
            var minLevel;
            minLevel = titles.reduce((function(a, b) {
              return Math.min(a, b.level);
            }), 100);
            return render(TPL_TOC, {
              titles: titles,
              minLevel: minLevel
            }, function(err, toc) {
              if (err != null) {
                throw err;
              }
              return callback(toc);
            });
          });
        });
      });
    };

    DoccoFileProcessor.prototype.process = function(callback) {
      var _this = this;
      return fs.readFile(this.file.path, function(err, code) {
        var sections;
        if (err != null) {
          throw err;
        }
        sections = parse(_this.file.path, code.toString());
        return _this.highlightFile(_this.file.path, sections, function(toc) {
          var context;
          context = {
            sections: sections,
            header: _this.header,
            nav: _this.nav,
            file: _this.file
          };
          return render(TPL_PATH, context, function(err, page) {
            if (err != null) {
              throw err;
            }
            page = page.replace(/@toc/g, toc);
            return fs.writeFile(_this.file.outputPath, page, function(err) {
              if (err != null) {
                throw err;
              }
              puts(("source for " + _this.file.relativePath.yellow + "                  documentation processed").squeeze(), 1);
              return typeof callback === "function" ? callback() : void 0;
            });
          });
        });
      });
    };

    return DoccoFileProcessor;

  })();

  module.exports = DoccoFileProcessor;

}
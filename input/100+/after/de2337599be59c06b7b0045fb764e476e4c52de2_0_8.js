function(mode) {
          var div, k, lineID, lines, sel, _results, _results2;
          sel = rangy.getIframeSelection(_this.editorIframe);
          if (mode === "sel") {
            lines = getSelectedLines(sel);
            k = 0;
            _results = [];
            while (k < lines.length) {
              div = lines[k];
              div.attr('toDisplay', div.attr('class') + '] ');
              _results.push(k++);
            }
            return _results;
          } else {
            lines = _this._lines;
            _results2 = [];
            for (lineID in lines) {
              div = $(lines[lineID].line$[0]);
              _results2.push(div.attr('toDisplay', div.attr('class') + '] '));
            }
            return _results2;
          }
        }
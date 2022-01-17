function(mode) {
          var div, k, lineID, lines, sel;
          sel = rangy.getIframeSelection(_this.editorIframe);
          if (mode === "sel") {
            lines = getSelectedLines(sel);
            k = 0;
            while (k < lines.length) {
              div = lines[k];
              div.attr('toDisplay', div.attr('class') + '] ');
              k++;
            }
          } else {
            lines = _this._lines;
            for (lineID in lines) {
              div = $(lines[lineID].line$[0]);
              div.attr('toDisplay', div.attr('class') + '] ');
            }
          }
          return restoreSelection(sel);
        }
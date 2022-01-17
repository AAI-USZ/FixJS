function() {
          var OPERATOR, line, lineID, lines, range, sel, selectedEndContainer, selectedEndContainerOffset, selectedStartContainer, selectedStartContainerOffset, spanTextNode, textOriginal;
          sel = rangy.getIframeSelection(_this.editorIframe);
          range = sel.getRangeAt(0);
          selectedStartContainer = range.startContainer;
          selectedStartContainerOffset = range.startOffset;
          selectedEndContainer = range.endContainer;
          selectedEndContainerOffset = range.endOffset;
          lines = _this._lines;
          OPERATOR = /(Th|Tu|To|Lh|Lu|Lo)-\d+\]/;
          for (lineID in lines) {
            line = lines[lineID];
            spanTextNode = line.line$[0].firstChild.firstChild;
            if (spanTextNode !== null) {
              textOriginal = spanTextNode.textContent;
              spanTextNode.textContent = textOriginal.replace(OPERATOR, "");
            }
          }
          range = rangy.createRange();
          range.setStart(selectedStartContainer, selectedStartContainerOffset + 1 - 6);
          range.setEnd(selectedEndContainer, selectedEndContainerOffset + 1 - 6);
          sel.setSingleRange(range);
          return beautify(editorBody$);
        }
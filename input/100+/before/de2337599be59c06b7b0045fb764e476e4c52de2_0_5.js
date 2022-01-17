function(startLine, endLine) {
        var deltaDepth, deltaDepth1stLine, depthSibling, endLineDepthAbs, endOfLineFragment, firstLineAfterSiblingsOfDeleted, line, newDepth, prevSiblingType, range, range4caret, range4fragment, startContainer, startLineDepthAbs, startOffset;
        if (startLine !== void 0) {
          range = rangy.createRange();
          range.setStartBefore(startLine.line$);
          range.setStartAfter(endLine.line$);
        } else {
          this._findLines();
          range = this.currentSel.range;
          startContainer = range.startContainer;
          startOffset = range.startOffset;
          startLine = this.currentSel.startLine;
          endLine = this.currentSel.endLine;
        }
        endLineDepthAbs = endLine.lineDepthAbs;
        startLineDepthAbs = startLine.lineDepthAbs;
        deltaDepth = endLineDepthAbs - startLineDepthAbs;
        range4fragment = rangy.createRangyRange();
        range4fragment.setStart(range.endContainer, range.endOffset);
        range4fragment.setEndAfter(endLine.line$[0].lastChild);
        endOfLineFragment = range4fragment.cloneContents();
        if (endLine.lineType[1] === 'h' && startLine.lineType[1] !== 'h') {
          if (endLine.lineType[0] === 'L') {
            endLine.lineType = 'T' + endLine.lineType[1];
            endLine.line$.prop("class", "" + endLine.lineType + "-" + endLine.lineDepthAbs);
          }
          this.markerList(endLine);
        }
        range.deleteContents();
        if (startLine.line$[0].lastChild.nodeName === 'BR') {
          startLine.line$[0].removeChild(startLine.line$[0].lastChild);
        }
        startLine.line$.append(endOfLineFragment);
        startLine.lineNext = endLine.lineNext;
        if (endLine.lineNext !== null) endLine.lineNext.linePrev = startLine;
        endLine.line$.remove();
        delete this._lines[endLine.lineID];
        line = startLine.lineNext;
        if (line !== null) {
          deltaDepth1stLine = line.lineDepthAbs - startLineDepthAbs;
          if (deltaDepth1stLine >= 1) {
            while (line !== null && line.lineDepthAbs >= endLineDepthAbs) {
              newDepth = line.lineDepthAbs - deltaDepth;
              line.lineDepthAbs = newDepth;
              line.line$.prop("class", "" + line.lineType + "-" + newDepth);
              line = line.lineNext;
            }
          }
        }
        if (line !== null) {
          if (line.lineType[0] === 'L') {
            line.lineType = 'T' + line.lineType[1];
            line.line$.prop("class", "" + line.lineType + "-" + line.lineDepthAbs);
          }
          firstLineAfterSiblingsOfDeleted = line;
          depthSibling = line.lineDepthAbs;
          line = line.linePrev;
          while (line !== null && line.lineDepthAbs > depthSibling) {
            line = line.linePrev;
          }
          prevSiblingType = line.lineType;
          if (firstLineAfterSiblingsOfDeleted.lineType !== prevSiblingType) {
            if (prevSiblingType[1] === 'h') {
              this._line2titleList(firstLineAfterSiblingsOfDeleted);
            } else {
              this.markerList(firstLineAfterSiblingsOfDeleted);
            }
          }
        }
        range4caret = rangy.createRange();
        range4caret.collapseToPoint(startContainer, startOffset);
        this.currentSel.sel.setSingleRange(range4caret);
        return this.currentSel = null;
      }
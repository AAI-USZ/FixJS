function() {
        /* initialisation of the page
        this.replaceContent( require('./templates/content-full') )
        this.replaceContent( require('./templates/content-empty') )
        this.replaceContent( require('./templates/content-full-marker') )
        this.replaceContent( require('./templates/content-shortlines-marker') )
        */
        var addClassToLines, editorCtrler, getSelectedLines, removeClassFromLines, restoreSelection,
          _this = this;
        this.replaceContent(require('./templates/content-shortlines-all'));
        editorCtrler = this;
        editorBody$ = this.editorBody$;
        beautify(editorBody$);
        editorBody$.on('keyup', function() {
          return beautify(editorBody$);
        });
        $("#resultBtnBar_coller").on('click', function() {
          return beautify(editorBody$);
        });
        $("#EmptyTextBtn").on("click", function() {
          editorCtrler.replaceContent(require('./templates/content-empty'));
          return beautify(editorBody$);
        });
        $("#SimpleTextBtn").on("click", function() {
          editorCtrler.replaceContent(require('./templates/content-simple'));
          return beautify(editorBody$);
        });
        $("#FullTextBtn").on("click", function() {
          editorCtrler.replaceContent(require('./templates/content-full'));
          return beautify(editorBody$);
        });
        $('#contentSelect').on("change", function(e) {
          console.log("./templates/" + e.currentTarget.value);
          editorCtrler.replaceContent(require("./templates/" + e.currentTarget.value));
          return beautify(editorBody$);
        });
        $('#cssSelect').on("change", function(e) {
          return editorCtrler.replaceCSS(e.currentTarget.value);
        });
        $("#indentBtn").on("click", function() {
          return editorCtrler.tab();
        });
        $("#unIndentBtn").on("click", function() {
          return editorCtrler.shiftTab();
        });
        $("#markerListBtn").on("click", function() {
          return editorCtrler.markerList();
        });
        $("#titleBtn").on("click", function() {
          return editorCtrler.titleList();
        });
        $("#checkBtn").on("click", function() {
          return checker.checkLines(editorCtrler);
        });
        $("#CozyMarkdown").on("click", function() {
          return $("#resultText").val(cozy2md.translate($("#resultText").val()));
        });
        restoreSelection = function(sel) {
          var i, num, range, _ref;
          num = sel.rangeCount;
          if (num === 0) return;
          for (i = 0, _ref = num - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
            range = sel.getRangeAt(i);
            sel.setSingleRange(range);
          }
          return beautify(editorBody$);
        };
        getSelectedLines = function(sel) {
          var divs, i, k, myDivs, node, range, _ref;
          myDivs = [];
          if (sel.rangeCount === 0) return;
          for (i = 0, _ref = sel.rangeCount - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
            range = sel.getRangeAt(i);
            divs = range.getNodes([1], function(element) {
              return element.tagName === 'DIV';
            });
            if (divs.length === 0) {
              if (range.commonAncestorContainer.tagName !== 'BODY') {
                node = range.commonAncestorContainer;
                while (node.tagName !== 'DIV') {
                  node = node.parentNode;
                }
                divs.push(node);
              }
            }
            k = 0;
            while (k < divs.length) {
              myDivs.push($(divs[k]));
              k++;
            }
          }
          return myDivs;
        };
        addClassToLines = function(mode) {
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
        };
        removeClassFromLines = function(mode) {
          var div, k, lineID, lines, sel;
          sel = rangy.getIframeSelection(_this.editorIframe);
          if (mode === "sel") {
            lines = getSelectedLines(sel);
            k = 0;
            while (k < lines.length) {
              div = lines[k];
              div.attr('toDisplay', '');
              k++;
            }
          } else {
            lines = _this._lines;
            for (lineID in lines) {
              div = $(lines[lineID].line$[0]);
              div.attr('toDisplay', '');
            }
          }
          return restoreSelection(sel);
        };
        $("#addClass2LineBtn").on("click", function() {
          addClassToLines();
          if (editor_doAddClasseToLines) {
            $("#addClass2LineBtn").html("Show Class on Lines");
            editor_doAddClasseToLines = false;
            editorBody$.off('keyup', addClassToLines);
            return removeClassFromLines();
          } else {
            $("#addClass2LineBtn").html("Hide Class on Lines");
            editor_doAddClasseToLines = true;
            return editorBody$.on('keyup', addClassToLines);
          }
        });
        $("#addClass").on("click", function() {
          return addClassToLines("sel");
        });
        $("#delClass").on("click", function() {
          return removeClassFromLines("sel");
        });
        return this.editorBody$.on('mouseup', function() {
          this.newPosition = true;
          return $("#editorPropertiesDisplay").text("newPosition = true");
        });
      }
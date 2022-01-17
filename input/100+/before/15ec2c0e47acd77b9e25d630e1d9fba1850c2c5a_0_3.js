function() {
    var AutoTest, CNEditor, CNcozyToMarkdown, CNmarkdownToCozy, beautify, checker, cozy2md, editorBody$, editor_css$, editor_doAddClasseToLines, editor_head$, md2cozy;

    beautify = require('views/beautify').beautify;

    CNEditor = require('views/editor').CNEditor;

    CNcozyToMarkdown = require('views/cozyToMarkdown').CNcozyToMarkdown;

    CNmarkdownToCozy = require('views/markdownToCozy').CNmarkdownToCozy;

    AutoTest = require('views/autoTest').AutoTest;

    cozy2md = new CNcozyToMarkdown();

    md2cozy = new CNmarkdownToCozy();

    checker = new AutoTest();

    editorBody$ = void 0;

    editor_head$ = void 0;

    editor_css$ = void 0;

    editor_doAddClasseToLines = void 0;

    exports.initPage = function() {
      var cb, editor, editorIframe$;
      $("body").html(require('./templates/editor'));
      editorIframe$ = $("iframe");
      cb = function() {
        /* initialisation of the page
        this.replaceContent( require('./templates/content-full') )
        this.replaceContent( require('./templates/content-empty') )
        this.replaceContent( require('./templates/content-full-marker') )
        this.replaceContent( require('./templates/content-shortlines-marker') )
        */
        var addClass2Line, checking, editorCtrler, removeClassFromLines,
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
        checking = false;
        $("#checkBtn").on("click", function() {
          return checker.checkLines(editorCtrler);
        });
        $("#CozyMarkdown").on("click", function() {
          return $("#resultText").val(cozy2md.translate($("#resultText").val()));
        });
        addClass2Line = function() {
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
              spanTextNode.textContent = ("" + line.lineType + "-" + line.lineDepthAbs + "] ") + textOriginal.replace(OPERATOR, "");
            }
          }
          range = rangy.createRange();
          range.setStart(selectedStartContainer, selectedStartContainerOffset + 1);
          range.setEnd(selectedEndContainer, selectedEndContainerOffset + 1);
          sel.setSingleRange(range);
          return beautify(editorBody$);
        };
        removeClassFromLines = function() {
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
        };
        $("#addClass2LineBtn").on("click", function() {
          addClass2Line();
          if (editor_doAddClasseToLines) {
            editor_doAddClasseToLines = false;
            editorBody$.off('keyup', addClass2Line);
            return removeClassFromLines();
          } else {
            editor_doAddClasseToLines = true;
            return editorBody$.on('keyup', addClass2Line);
          }
        });
        return this.editorBody$.on('mouseup', function() {
          this.newPosition = true;
          return $("#editorPropertiesDisplay").text("newPosition = true");
        });
      };
      editor = new CNEditor($('#editorIframe')[0], cb);
      return editor;
    };

  }
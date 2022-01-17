function(e) {
        var div, keyStrokesCode, metaKeyStrokesCode, range4sel, sel, shortcut;
        metaKeyStrokesCode = (e.altKey ? "Alt" : "") + 
                                (e.ctrlKey ? "Ctrl" : "") + 
                                (e.shiftKey ? "Shift" : "");
        switch (e.keyCode) {
          case 13:
            keyStrokesCode = "return";
            break;
          case 35:
            keyStrokesCode = "end";
            break;
          case 36:
            keyStrokesCode = "home";
            break;
          case 33:
            keyStrokesCode = "pgUp";
            break;
          case 34:
            keyStrokesCode = "pgDwn";
            break;
          case 37:
            keyStrokesCode = "left";
            break;
          case 38:
            keyStrokesCode = "up";
            break;
          case 39:
            keyStrokesCode = "right";
            break;
          case 40:
            keyStrokesCode = "down";
            break;
          case 9:
            keyStrokesCode = "tab";
            break;
          case 8:
            keyStrokesCode = "backspace";
            break;
          case 32:
            keyStrokesCode = "space";
            break;
          case 27:
            keyStrokesCode = "esc";
            break;
          case 46:
            keyStrokesCode = "suppr";
            break;
          default:
            switch (e.which) {
              case 32:
                keyStrokesCode = "space";
                break;
              case 8:
                keyStrokesCode = "backspace";
                break;
              default:
                keyStrokesCode = e.which;
            }
        }
        shortcut = metaKeyStrokesCode + '-' + keyStrokesCode;
        if ((keyStrokesCode === "left" || keyStrokesCode === "up" || keyStrokesCode === "right" || keyStrokesCode === "down" || keyStrokesCode === "pgUp" || keyStrokesCode === "pgDwn" || keyStrokesCode === "end" || keyStrokesCode === "home") && (shortcut !== 'CtrlShift-down' && shortcut !== 'CtrlShift-up')) {
          this.newPosition = true;
          $("#editorPropertiesDisplay").text("newPosition = true");
        } else {
          if (this.newPosition) {
            this.newPosition = false;
            $("#editorPropertiesDisplay").text("newPosition = false");
            sel = rangy.getIframeSelection(this.editorIframe);
            div = sel.getRangeAt(0).startContainer;
            if (div.nodeName !== "DIV") div = $(div).parents("div")[0];
            if (div.innerHTML === "<span></span><br>") {
              range4sel = rangy.createRange();
              range4sel.collapseToPoint(div.firstChild, 0);
              sel.setSingleRange(range4sel);
            }
          }
        }
        this.currentSel = null;
        switch (shortcut) {
          case "-return":
            this._return();
            return e.preventDefault();
          case "-tab":
            this.tab();
            return e.preventDefault();
          case "-backspace":
            return this._backspace(e);
          case "-suppr":
            return this._suppr(e);
          case "Shift-tab":
            this.shiftTab();
            return e.preventDefault();
          case "Alt-97":
            this._toggleLineType();
            return e.preventDefault();
          case "Ctrl-118":
            return e.preventDefault();
          case "Ctrl-115":
            return e.preventDefault();
        }
      }
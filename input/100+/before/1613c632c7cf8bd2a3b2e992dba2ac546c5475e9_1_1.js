function onKeyDown(event) {
          priv.lastKeyCode = event.keyCode;
          if (selection.isSelected()) {
            var ctrlOnly = (event.ctrlKey || event.metaKey) && !event.altKey; //catch CTRL but not right ALT (which in some systems triggers ALT+CTRL)
            if ((event.keyCode == 32) || //space
                (event.keyCode >= 48 && event.keyCode <= 57) || //0-9
                (event.keyCode >= 96 && event.keyCode <= 111) || //numpad
                (event.keyCode >= 186 && event.keyCode <= 192) || //;=,-./`
                (event.keyCode >= 219 && event.keyCode <= 222) || //[]{}\|"'
                event.keyCode >= 226 || //special chars (229 for Asian chars)
                (event.keyCode >= 65 && event.keyCode <= 90)) { //a-z
              /* alphanumeric */
              if (!priv.isCellEdited && !ctrlOnly) { //disregard CTRL-key shortcuts
                editproxy.beginEditing();
              }
              else if (!priv.isCellEdited && ctrlOnly && event.keyCode === 65) { //CTRL + A
                selection.selectAll(); //select all cells
              }
              else if (ctrlOnly && (event.keyCode === 89 || (event.shiftKey && event.keyCode === 90))) { //CTRL + Y or CTRL + SHIFT + Z
                if (priv.undoRedo) {
                  priv.undoRedo.redo();
                }
              }
              else if (ctrlOnly && event.keyCode === 90) { //CTRL + Z
                if (priv.undoRedo) {
                  priv.undoRedo.undo();
                }
              }
              return;
            }

            var rangeModifier = event.shiftKey ? selection.setRangeEnd : selection.setRangeStart;

            switch (event.keyCode) {
              case 38: /* arrow up */
                if (isAutoComplete()) {
                  return true;
                }
                if (event.shiftKey) {
                  selection.transformEnd(-1, 0);
                }
                else {
                  editproxy.finishEditing(false, -1, 0);
                }
                event.preventDefault();
                break;

              case 9: /* tab */
                if (!isAutoComplete()) {
                  if (event.shiftKey) {
                    editproxy.finishEditing(false, 0, -1);
                  }
                  else {
                    editproxy.finishEditing(false, 0, 1);
                  }
                }
                event.preventDefault();
                break;

              case 39: /* arrow right */
                if (!priv.isCellEdited) {
                  if (event.shiftKey) {
                    selection.transformEnd(0, 1);
                  }
                  else {
                    selection.transformStart(0, 1);
                  }
                  event.preventDefault();
                }
                break;

              case 37: /* arrow left */
                if (!priv.isCellEdited) {
                  if (event.shiftKey) {
                    selection.transformEnd(0, -1);
                  }
                  else {
                    selection.transformStart(0, -1);
                  }
                  event.preventDefault();
                }
                break;

              case 8: /* backspace */
              case 46: /* delete */
                if (!priv.isCellEdited) {
                  selection.empty(event);
                  event.preventDefault();
                }
                break;

              case 40: /* arrow down */
                if (!priv.isCellEdited) {
                  if (event.shiftKey) {
                    selection.transformEnd(1, 0); //expanding selection down with shift
                  }
                  else {
                    selection.transformStart(1, 0); //move selection down
                  }
                }
                else {
                  if (isAutoComplete()) { //if browsing through autocomplete
                    return true;
                  }
                  else {
                    editproxy.finishEditing(false, 1, 0);
                  }
                }
                break;

              case 27: /* ESC */
                if (priv.isCellEdited) {
                  editproxy.finishEditing(true, 0, 0); //hide edit field, restore old value, don't move selection, but refresh routines
                }
                break;

              case 113: /* F2 */
                if (!priv.isCellEdited) {
                  editproxy.beginEditing(true); //show edit field
                }
                break;

              case 13: /* return/enter */
                if (!priv.isCellEdited) {
                  if (priv.settings.enterBeginsEditing) {
                    editproxy.beginEditing(true); //show edit field
                    if (!event.shiftKey) {
                      event.preventDefault(); //don't add newline to field
                    }
                  }
                  else {
                    if (event.shiftKey) {
                      selection.transformStart(-1, 0, !priv.settings.enterBeginsEditing); //move selection up
                    }
                    else {
                      selection.transformStart(1, 0, !priv.settings.enterBeginsEditing); //move selection down
                    }
                  }
                }
                else {
                  if (event.shiftKey) { //if shift+enter
                    return true;
                  }
                  else if (!isAutoComplete()) {
                    editproxy.finishEditing(false, 1, 0);
                    event.preventDefault(); //don't add newline to field
                  }
                }
                break;

              case 36: /* home */
                if (!priv.isCellEdited) {
                  if (event.ctrlKey || event.metaKey) {
                    rangeModifier(grid.getCellAtCoords({row: 0, col: priv.selStart.col}));
                  }
                  else {
                    rangeModifier(grid.getCellAtCoords({row: priv.selStart.row, col: 0}));
                  }
                }
                break;

              case 35: /* end */
                if (!priv.isCellEdited) {
                  if (event.ctrlKey || event.metaKey) {
                    rangeModifier(grid.getCellAtCoords({row: self.rowCount - 1, col: priv.selStart.col}));
                  }
                  else {
                    rangeModifier(grid.getCellAtCoords({row: priv.selStart.row, col: self.colCount - 1}));
                  }
                }
                break;

              case 33: /* pg up */
                rangeModifier(grid.getCellAtCoords({row: 0, col: priv.selStart.col}));
                break;

              case 34: /* pg dn */
                rangeModifier(grid.getCellAtCoords({row: self.rowCount - 1, col: priv.selStart.col}));
                break;

              default:
                break;
            }
          }
        }
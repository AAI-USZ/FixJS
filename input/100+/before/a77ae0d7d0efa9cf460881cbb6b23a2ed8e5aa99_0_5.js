function () {

        priv.editProxy = $('<textarea class="handsontableInput">');

        priv.editProxyHolder = $('<div class="handsontableInputHolder">');

        priv.editProxyHolder.append(priv.editProxy);



        function onClick(event) {

          event.stopPropagation();

        }



        function onCut() {

          if (!priv.isCellEdited) {

            setTimeout(function () {

              selection.empty();

            }, 100);

          }

        }



        function onPaste() {

          if (!priv.isCellEdited) {

            setTimeout(function () {

              var input = priv.editProxy.val().replace(/^[\r\n]*/g, '').replace(/[\r\n]*$/g, ''), //remove newline from the start and the end of the input

                  inputArray = CSVToArray(input, '\t'),

                  coords = grid.getCornerCoords([priv.selStart, priv.selEnd]),

                  endTd = grid.populateFromArray(coords.TL, inputArray, {

                    row: Math.max(coords.BR.row, inputArray.length - 1 + coords.TL.row),

                    col: Math.max(coords.BR.col, inputArray[0].length - 1 + coords.TL.col)

                  }, null, 'paste');

              selection.setRangeEnd(endTd);

            }, 100);

          }

        }



        function onKeyDown(event) {

          priv.lastKeyCode = event.keyCode;

          if (selection.isSelected()) {

            var ctrlDown = (event.ctrlKey || event.metaKey) && !event.altKey; //catch CTRL but not right ALT (which in some systems triggers ALT+CTRL)

            if ((event.keyCode == 32) || //space

                (event.keyCode >= 48 && event.keyCode <= 57) || //0-9

                (event.keyCode >= 96 && event.keyCode <= 111) || //numpad

                (event.keyCode >= 186 && event.keyCode <= 192) || //;=,-./`

                (event.keyCode >= 219 && event.keyCode <= 222) || //[]{}\|"'

                event.keyCode >= 226 || //special chars (229 for Asian chars)

                (event.keyCode >= 65 && event.keyCode <= 90)) { //a-z

              /* alphanumeric */

              if (!priv.isCellEdited && !ctrlDown) { //disregard CTRL-key shortcuts

                editproxy.beginEditing();

              }

              else if (ctrlDown) {

                if (!priv.isCellEdited && event.keyCode === 65) { //CTRL + A

                  selection.selectAll(); //select all cells

                }

                else if (!priv.isCellEdited && event.keyCode === 88 && $.browser.opera) { //CTRL + X

                  priv.editProxy.triggerHandler('cut'); //simulate oncut for Opera

                }

                else if (!priv.isCellEdited && event.keyCode === 86 && $.browser.opera) { //CTRL + V

                  priv.editProxy.triggerHandler('paste'); //simulate onpaste for Opera

                }

                else if (event.keyCode === 89 || (event.shiftKey && event.keyCode === 90)) { //CTRL + Y or CTRL + SHIFT + Z

                  if (priv.undoRedo) {

                    priv.undoRedo.redo();

                  }

                }

                else if (event.keyCode === 90) { //CTRL + Z

                  if (priv.undoRedo) {

                    priv.undoRedo.undo();

                  }

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

                if (!priv.isCellEdited) {

                  if (event.shiftKey) {

                    selection.transformEnd(-1, 0);

                  }

                  else {

                    selection.transformStart(-1, 0);

                  }

                  event.preventDefault();

                }

                else {

                  editproxy.finishEditing(false, -1, 0);

                }

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

                else if (editproxy.getCaretPosition() === priv.editProxy.val().length) {

                  editproxy.finishEditing(false, 0, 1);

                  if (isAutoComplete() && isAutoComplete().shown) {

                    isAutoComplete().hide();

                  }

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

                else if (editproxy.getCaretPosition() === 0) {

                  editproxy.finishEditing(false, 0, -1);

                  if (isAutoComplete() && isAutoComplete().shown) {

                    isAutoComplete().hide();

                  }

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

                  event.preventDefault(); //prevent Opera from opening Go to Page dialog

                }

                break;



              case 13: /* return/enter */

                if (priv.isCellEdited) {

                  if ((event.ctrlKey && !selection.isMultiple()) || event.altKey) { //if ctrl+enter or alt+enter, add new line

                    priv.editProxy.val(priv.editProxy.val() + '\n');

                    priv.editProxy[0].focus();

                  }

                  else if (!isAutoComplete()) {

                    if (event.shiftKey) { //if shift+enter, finish and move up

                      editproxy.finishEditing(false, -1, 0, ctrlDown);

                    }

                    else { //if enter, finish and move down

                      editproxy.finishEditing(false, 1, 0, ctrlDown);

                    }

                  }

                }

                else {

                  if (event.shiftKey) {

                    selection.transformStart(-1, 0); //move selection up

                  }

                  else {

                    if (priv.settings.enterBeginsEditing) {

                      if ((ctrlDown && !selection.isMultiple()) || event.altKey) { //if ctrl+enter or alt+enter, add new line

                        editproxy.beginEditing(true, '\n'); //show edit field

                      }

                      else {

                        editproxy.beginEditing(true); //show edit field

                      }

                    }

                    else {

                      selection.transformStart(1, 0, (!priv.settings.enterBeginsEditing && priv.settings.minSpareRows > 0)); //move selection down

                    }

                  }

                }

                event.preventDefault(); //don't add newline to field

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



        function onKeyUp(event) {

          if (priv.stopNextPropagation) {

            event.stopImmediatePropagation();

            priv.stopNextPropagation = false;

          }

        }



        function onChange() {

          if (isAutoComplete()) { //could this change be from autocomplete

            var val = priv.editProxy.val();

            if (val !== lastChange && val === priv.lastAutoComplete) { //is it change from source (don't trigger on partial)

              priv.isCellEdited = true;

              if (priv.lastKeyCode === 9) { //tab

                editproxy.finishEditing(false, 0, 1);

              }

              else { //return/enter

                editproxy.finishEditing(false, 1, 0);

              }

            }

            lastChange = val;

          }

        }



        priv.editProxy.on('click', onClick);

        priv.editProxy.on('cut', onCut);

        priv.editProxy.on('paste', onPaste);

        priv.editProxy.on('keydown', onKeyDown);

        priv.editProxy.on('keyup', onKeyUp);

        priv.editProxy.on('change', onChange);

        container.append(priv.editProxyHolder);

      }
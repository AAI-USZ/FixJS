function () {

              var input = priv.editProxy.val().replace(/^[\r\n]*/g, '').replace(/[\r\n]*$/g, ''), //remove newline from the start and the end of the input

                  inputArray = CSVToArray(input, '\t'),

                  coords = grid.getCornerCoords([priv.selStart, priv.selEnd]),

                  endTd = grid.populateFromArray(coords.TL, inputArray, {

                    row: Math.max(coords.BR.row, inputArray.length - 1 + coords.TL.row),

                    col: Math.max(coords.BR.col, inputArray[0].length - 1 + coords.TL.col)

                  }, null, 'paste');

              selection.setRangeEnd(endTd);

            }
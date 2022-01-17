function (isCancelled, moveRow, moveCol, ctrlDown) {
        if (priv.isCellEdited) {
          priv.isCellEdited = false;
          var val = $.trim(priv.editProxy.val());
          var changes = [], change;
          if (ctrlDown) { //if ctrl+enter and multiple cells selected, behave like Excel (finish editing and apply to all cells)
            var corners = grid.getCornerCoords([priv.selStart, priv.selEnd]);
            var r, c;
            for (r = corners.TL.row; r <= corners.BR.row; r++) {
              for (c = corners.TL.col; c <= corners.BR.col; c++) {
                change = editproxy.finishEditingCells(r, c, val);
                if (change) {
                  changes.push(change);
                }
              }
            }
          }
          else {
            change = editproxy.finishEditingCells(priv.selStart.row, priv.selStart.col, val);
            if (change) {
              changes.push(change);
            }
          }

          if (changes.length) {
            self.container.triggerHandler("datachange.handsontable", [changes, 'edit']);
          }

          priv.editProxy.css({
            width: 0,
            height: 0
          });
          priv.editProxyHolder.addClass('htHidden');
          priv.editProxyHolder.css({
            overflow: 'hidden'
          });
        }
        if (typeof moveRow !== "undefined" && typeof moveCol !== "undefined") {
          if (!isCancelled) {
            selection.transformStart(moveRow, moveCol, (!priv.settings.enterBeginsEditing && ((moveRow && priv.settings.minSpareRows > 0) || (moveCol && priv.settings.minSpareCols > 0))));
          }
        }
      }
function (isCancelled, moveRow, moveCol) {
        if (priv.isCellEdited) {
          priv.isCellEdited = false;
          var td = grid.getCellAtCoords(priv.selStart),
              $td = $(td),
              val = $.trim(priv.editProxy.val());
          var oldVal = datamap.get(priv.selStart.row, priv.selStart.col);
          if (oldVal !== val && grid.isCellWritable($td)) {
            var result;
            var change = [
              [priv.selStart.row, priv.selStart.col, oldVal, val]
            ];
            if (priv.settings.onBeforeChange) {
              result = priv.settings.onBeforeChange(change);
            }
            if (result !== false && change[0][3] !== false) { //edit is not cancelled
              self.setDataAtCell(change[0][0], change[0][1], change[0][3]);
              self.container.triggerHandler("datachange.handsontable", [change, 'type']);
            }
          }

          priv.editProxy.css({
            width: '1000px',
            height: '1000px'
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
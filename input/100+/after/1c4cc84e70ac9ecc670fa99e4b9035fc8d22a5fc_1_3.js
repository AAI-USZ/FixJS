function (settings) {
      var i, j;
      for (var i in settings) {
        if (settings.hasOwnProperty(i)) {
          priv.settings[i] = settings[i];
        }

        //launch extensions
        if (handsontable.extension[i]) {
          priv.extensions[i] = new handsontable.extension[i](self, settings[i]);
        }
      }

      if (typeof settings.colHeaders !== "undefined") {
        if (settings.colHeaders === false && priv.extensions["ColHeader"]) {
          priv.extensions["ColHeader"].destroy();
        }
        else {
          priv.extensions["ColHeader"] = new handsontable.ColHeader(self, settings.colHeaders);
        }
      }

      if (typeof settings.rowHeaders !== "undefined") {
        if (settings.rowHeaders === false && priv.extensions["RowHeader"]) {
          priv.extensions["RowHeader"].destroy();
        }
        else {
          priv.extensions["RowHeader"] = new handsontable.RowHeader(self, settings.rowHeaders);
        }
      }

      var blockedRowsCount = self.blockedRows.count();
      var blockedColsCount = self.blockedCols.count();
      if (blockedRowsCount && blockedColsCount) {
        if (!priv.cornerHeader) {
          var position = self.table.position();
          var html = '<div style="position: absolute; top: ' + position.top + 'px; left: ' + position.left + 'px; width: 50px;"><table cellspacing="0" cellpadding="0"><thead>';
          for (i = 0; i < blockedRowsCount; i++) {
            html += '<tr>';
            for (j = blockedColsCount - 1; j >= 0; j--) {
              html += '<th class="' + self.blockedCols.headers[j].className + '">&nbsp;<span class="small">&nbsp;</span>&nbsp;</th>';
            }
            html += '</tr>';
          }
          html += '</thead></table></div>';
          priv.cornerHeader = $(html);
          priv.cornerHeader.on('click', function () {
            selection.selectAll();
          });
          container.append(priv.cornerHeader);
        }
      }
      else {
        if (priv.cornerHeader) {
          priv.cornerHeader.remove();
          priv.cornerHeader = null;
        }
      }

      self.blockedCols && self.blockedCols.update();
      self.blockedRows && self.blockedRows.update();

      var recreated = grid.keepEmptyRows();
      if (!recreated) {
        selection.refreshBorders();
      }
    }
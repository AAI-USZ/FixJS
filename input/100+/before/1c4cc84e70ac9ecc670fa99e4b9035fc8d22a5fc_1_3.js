function (settings) {
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

      if (self.blockedRows.count() && self.blockedCols.count()) {
        if (!priv.cornerHeader) {
          var position = self.table.position();
          priv.cornerHeader = $('<div style="position: absolute; top: ' + position.top + 'px; left: ' + position.left + 'px; width: 50px;"><table cellspacing="0" cellpadding="0"><thead><tr><th>&nbsp;<span class="small">&nbsp;</span>&nbsp;</th></tr></thead></table></div>');
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
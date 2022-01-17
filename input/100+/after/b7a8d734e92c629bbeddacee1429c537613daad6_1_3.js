function (useOriginalValue, suffix) {
        if (priv.isCellEdited) {
          return;
        }

        var td = grid.getCellAtCoords(priv.selStart),
            $td = $(td);

        if (!grid.isCellWritable($td)) {
          return;
        }

        if (priv.fillHandle) {
          autofill.hideHandle();
        }

        priv.isCellEdited = true;
        lastChange = '';

        if (useOriginalValue) {
          var original = datamap.get(priv.selStart.row, priv.selStart.col) + (suffix || '');
          priv.editProxy.val(original);
          editproxy.setCaretPosition(original.length);
        }
        else {
          priv.editProxy.val('');
        }

        var width, height;
        if (priv.editProxy.autoResize) {
          width = $td.width();
          height = $td.outerHeight() - 4;
        }
        else {
          width = $td.width() * 1.5;
          height = $td.height();
        }

        if (parseInt($td.css('border-top-width')) > 0) {
          height -= 1;
        }
        if (parseInt($td.css('border-left-width')) > 0) {
          if (self.blockedCols.count() > 0) {
            width -= 1;
          }
        }

        if (priv.editProxy.autoResize) {
          //console.log("hwhw", height, width, priv.editProxy.autoResize('check'), '->', priv.editProxy.data('AutoResizer').check());
          priv.editProxy.autoResize({
            maxHeight: 200,
            minHeight: height,
            minWidth: width,
            maxWidth: Math.max(168, width),
            animate: false,
            extraSpace: 0
          });
        }
        else {
          priv.editProxy.css({
            width: width,
            height: height
          });
        }
        priv.editProxyHolder.removeClass('htHidden');
        priv.editProxyHolder.css({
          overflow: 'visible'
        });

        priv.stopNextPropagation = true;
        if (priv.settings.autoComplete) {
          setTimeout(function () {
            priv.editProxy.data('typeahead').lookup();
          }, 10);
        }
      }
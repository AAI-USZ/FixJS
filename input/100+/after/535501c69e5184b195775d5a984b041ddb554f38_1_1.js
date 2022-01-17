function (useOriginalValue) {
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

        if (selection.isMultiple()) {
          highlight.off();
          priv.selEnd = priv.selStart;
          highlight.on();
        }

        if (useOriginalValue) {
          var original = datamap.get(priv.selStart.row, priv.selStart.col);
          priv.editProxy.val(original);
          editproxy.setCaretPosition(original.length);
        }
        else if (priv.isMouseDown) {
          priv.editProxy.val('');
        }

        if (priv.editProxy.autoResize) {
          priv.editProxy.autoResize(priv.editProps);
        }
        else {
          priv.editProxy.css(priv.editProps);
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
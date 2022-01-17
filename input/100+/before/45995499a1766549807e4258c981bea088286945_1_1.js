function (useOriginalValue) {
        if (priv.isCellEdited) {
          return;
        }

        if (priv.fillHandle) {
          autofill.hideHandle();
        }

        var td = grid.getCellAtCoords(priv.selStart),
            $td = $(td);

        priv.isCellEdited = true;
        lastChange = '';

        if (selection.isMultiple()) {
          highlight.off();
          priv.selEnd = priv.selStart;
          highlight.on();
        }

        if (!grid.isCellWriteable($td)) {
          return;
        }

        if (useOriginalValue) {
          priv.editProxy.val(datamap.get(priv.selStart.row, priv.selStart.col));
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

        if (priv.settings.autoComplete) {
          setTimeout(function () {
            priv.editProxy.data('typeahead').lookup();
            priv.stopNextPropagation = true;
          }, 10);
        }
      }
function () {

        if (!selection.isSelected()) {

          return;

        }

        if (priv.isCellEdited) {

          editproxy.finishEditing();

        }

        highlight.off();

        priv.currentBorder.disappear();

        if (priv.fillHandle) {

          autofill.hideHandle();

        }

        selection.end(false);

        self.container.trigger('deselect.handsontable');

      }
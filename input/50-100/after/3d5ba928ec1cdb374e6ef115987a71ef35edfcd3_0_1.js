function (doc) {
        enableSaveBtn(false);
        var history = doc.historySize();
        if (history.redo == 0 && history.undo == 0) {
          return;
        }
        enableSaveBtn(true);
        onDocValueUpdate(doc.getValue());
      }
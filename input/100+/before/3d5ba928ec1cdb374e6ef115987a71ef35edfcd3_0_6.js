function (e) {
        e.preventDefault();
        editingNotice.text('');
        var json = onDocValueUpdate(self.jsonCodeEditor.getValue());
        if (json) {
          startSpinner(codeMirror);
          enableSaveBtns(false);
          enableDeleteBtn(false);
          couchReq('PUT', currentDocUrl, json, function () {
            couchReq("GET", currentDocUrl, undefined, function (doc) {
              self.jsonCodeEditor.setValue(JSON.stringify(doc, null, "  "));
              stopSpinner();
              enableDeleteBtn(true);
              enableSaveBtns(true);
            });
          }, function (error, num, unexpected) {
            if (error.reason) {
              stopSpinner();
              editingNotice.text(error.reason).show();
            } else {
              unexpected();
            }
          });
        }
      }
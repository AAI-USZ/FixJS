function (doc) {
              self.jsonCodeEditor.setValue(JSON.stringify(doc, null, "  "));
              stopSpinner();
              enableDeleteBtn(true);
              enableSaveBtns(true);
            }
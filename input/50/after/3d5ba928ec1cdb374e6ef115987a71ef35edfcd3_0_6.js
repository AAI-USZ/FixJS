function (doc) {
              removeSpecialKeys(doc);
              self.jsonCodeEditor.setValue(JSON.stringify(doc, null, "  "));
              stopSpinner();
              enableDeleteBtn(true);
              enableSaveAsBtn(true);
            }
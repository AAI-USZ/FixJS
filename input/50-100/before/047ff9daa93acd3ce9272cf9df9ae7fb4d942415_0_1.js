function(json) {
            markup.chooseButton.showInlineBlock()
            markup.loadingButton.hide()
            json = self.recordsToItems(json)
            cache[request.term] = json
            response(json)
          }
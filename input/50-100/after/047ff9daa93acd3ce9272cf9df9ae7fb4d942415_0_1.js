function(json) {
            markup.chooseButton.showInlineBlock()
            markup.loadingButton.hide()
            json = self.recordsToItems(json)
            json.push({label: '<em>Clear</em>', value: request.term, clear: true})
            cache[request.term] = json
            response(json)
          }
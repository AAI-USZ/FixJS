function() {
        var self = this,
            check = function() {
                if (self.clicked)
                    return false

                clearInterval(this.timer)

                var newTags = self.listTags.get('value').clean().stripScripts()
                self.options.caseSensitiveTagMatching || (newTags = newTags.toLowerCase())

                if (newTags.length) {
                    self.processTags(newTags)
                    self.options.persist && self.listTags.focus.delay(10, self.listTags)
                }
                self.options.autoSuggest && self.autoSuggester.hide()
                return true
            }

        clearInterval(this.timer)

        check() || (this.timer = check.periodical(200))

        return this
    }